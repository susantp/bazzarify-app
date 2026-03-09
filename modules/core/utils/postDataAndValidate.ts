import { z } from "zod";
import { AxiosResponse } from "axios";
import { authAxiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  hasEnvelopeError,
  toActionFeedbackError,
} from "@/modules/core/utils/actionFeedback";

export default async function postDataAndValidate<
  TData,
  TResponse extends z.ZodType,
>(
  endpoint: { module: string; path: string },
  data: TData,
  responseSchema: TResponse,
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
    upstream = await instance.post(endpoint.path, data);
  } catch (error) {
    const err = toActionFeedbackError(error, errorMessage);
    Sentry.captureException(error);
    throw err;
  }
  if (hasEnvelopeError(upstream.data)) {
    throw toActionFeedbackError(upstream.data, errorMessage);
  }
  const parsed = responseSchema.safeParse(upstream.data);

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    console.log("postDataAndValidate", issues);
    Sentry.captureException(issues);
    throw toActionFeedbackError(
      new Error("API response schema validation failed"),
      "API response schema validation failed",
    );
  }

  return parsed.data;
}
