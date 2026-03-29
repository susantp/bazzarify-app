import { AxiosResponse } from "axios";
import * as Sentry from "@sentry/react-native";
import { z } from "zod";
import { axiosInstance } from "@/modules/core/utils/axios";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { getAuthToken } from "@/modules/auth/utils/token";
import {
  getAnonymousActorId,
  syncAnonymousActorId,
} from "@/modules/search/utils/anonymousActor";
import {
  SearchHistoryPayloadSchema,
  TSearchHistoryPayload,
} from "@/modules/search/schemas/SearchHistoryPayloadSchema";
import {
  hasEnvelopeError,
  toActionFeedbackError,
} from "@/modules/core/utils/actionFeedback";

const SearchHistoryEnvelopeSchema = DataSchema(SearchHistoryPayloadSchema);

async function createHistoryHeaders() {
  const token = await getAuthToken();
  const anonymousActorId = await getAnonymousActorId();

  return {
    ...(token ? { "x-api-token": token } : {}),
    ...(token || !anonymousActorId ? {} : { "x-actor-id": anonymousActorId }),
  };
}

async function parseHistoryResponse(
  upstream: AxiosResponse<z.infer<typeof SearchHistoryEnvelopeSchema>>,
) {
  if (hasEnvelopeError(upstream.data)) {
    throw toActionFeedbackError(
      upstream.data,
      "Unable to process search history.",
    );
  }

  const parsed = SearchHistoryEnvelopeSchema.safeParse(upstream.data);

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    Sentry.captureException(issues);
    throw new Error("Search history schema validation failed.");
  }

  const payload = parsed.data.payload;

  if (payload === null) {
    throw new Error("Search history payload was unexpectedly empty.");
  }

  await syncAnonymousActorId(payload.actor.id, payload.actor.type);

  return payload;
}

export async function actionGetSearchHistory(): Promise<TSearchHistoryPayload> {
  const response = await axiosInstance.get("/search/history", {
    headers: await createHistoryHeaders(),
  });

  return parseHistoryResponse(response);
}

export async function actionRememberSearchHistory(
  query: string,
): Promise<TSearchHistoryPayload> {
  const response = await axiosInstance.post(
    "/search/history",
    { query },
    {
      headers: await createHistoryHeaders(),
    },
  );

  return parseHistoryResponse(response);
}

export async function actionRemoveSearchHistory(
  query: string,
): Promise<TSearchHistoryPayload> {
  const response = await axiosInstance.delete("/search/history", {
    headers: await createHistoryHeaders(),
    params: { query },
  });

  return parseHistoryResponse(response);
}

export async function actionClearSearchHistory(): Promise<TSearchHistoryPayload> {
  const response = await axiosInstance.delete("/search/history", {
    headers: await createHistoryHeaders(),
    params: { all: "1" },
  });

  return parseHistoryResponse(response);
}
