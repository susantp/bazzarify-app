import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  getActionFeedback,
  hasEnvelopeError,
  toActionFeedbackError,
} from "@/modules/core/utils/actionFeedback";
import {
  ConsumerProxyRequestError,
  getConsumerProxyFailure,
} from "@/modules/core/utils/handleError";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const unwrapConsumerData = (value: unknown): unknown => {
  if (isRecord(value) && "data" in value && "metaData" in value) {
    return value.data;
  }

  return value;
};

const logFetchBoundary = (
  stage: "transport" | "envelope" | "schema",
  endpoint: string,
  details: Record<string, unknown>,
) => {
  console.error("[fetch-boundary]", {
    endpoint,
    stage,
    ...details,
  });
};

export default async function fetchDataAndValidate<T extends z.ZodType>(
  endpoint: string,
  responsePayloadSchema: T,
  errorMessage: string,
  params?: Record<string, string>,
): Promise<z.infer<T>> {
  let upstream: AxiosResponse<unknown>;
  try {
    upstream = await axiosInstance.get(endpoint, { params });
  } catch (error: unknown) {
    const failure = getConsumerProxyFailure(error);
    const axiosError = error instanceof AxiosError ? error : null;
    logFetchBoundary("transport", endpoint, {
      message: errorMessage,
      httpStatus: axiosError?.response?.status ?? null,
      axiosCode: axiosError?.code ?? null,
      responseData: axiosError?.response?.data ?? null,
      cause:
        error instanceof Error ? error.message : "Unknown transport failure",
    });
    if (error instanceof AxiosError) {
      console.error("fetch and validate error:", error, error.cause);
    }
    const err = failure
      ? new ConsumerProxyRequestError(failure)
      : new Error(errorMessage, { cause: error });
    Sentry.captureException(err);
    throw err;
  }

  if (hasEnvelopeError(upstream.data)) {
    const feedback = getActionFeedback(upstream.data, errorMessage);
    logFetchBoundary("envelope", endpoint, {
      message: feedback.message,
      errorCode: feedback.errorCode,
      details: feedback.details ?? null,
      responseData: upstream.data,
    });
    const err = toActionFeedbackError(upstream.data, errorMessage);
    Sentry.captureException(err);
    throw err;
  }

  const parsed = responsePayloadSchema.safeParse(
    unwrapConsumerData(upstream.data),
  );

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    logFetchBoundary("schema", endpoint, {
      message: "API response schema validation failed",
      issues,
      responseData: upstream.data,
    });
    Sentry.captureException(issues);
    throw new Error("API response schema validation failed", { cause: issues });
  }

  return parsed.data;
}
