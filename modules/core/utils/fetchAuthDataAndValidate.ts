import { z } from "zod";
import { AxiosResponse } from "axios";
import { authAxiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  hasEnvelopeError,
  toActionFeedbackError,
} from "@/modules/core/utils/actionFeedback";

export async function fetchAuthDataAndValidate<TResponse extends z.ZodType>(
  endpoint: { module: string; path: string },
  responsePayloadSchema: TResponse,
  errorMessage: string,
  token: string,
): Promise<z.infer<TResponse>> {
  const instance = await authAxiosInstance({
    token,
    modulePath: endpoint.module,
  });
  let upstream: AxiosResponse<z.infer<TResponse>>;
  if (!instance) {
    throw new Error("Authentication error.");
  }
  try {
    upstream = await instance.get(endpoint.path);
  } catch (error: unknown) {
    const err = toActionFeedbackError(error, errorMessage);
    Sentry.captureException(err);
    throw err;
  }
  if (hasEnvelopeError(upstream.data)) {
    throw toActionFeedbackError(upstream.data, errorMessage);
  }
  const parsed = responsePayloadSchema.safeParse(upstream.data);

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    console.log("fetchAndValidate", issues);
    Sentry.captureException(issues);
    throw toActionFeedbackError(
      new Error("API response schema validation failed"),
      "API response schema validation failed",
    );
  }

  return parsed.data;
}
