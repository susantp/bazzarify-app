import { isAxiosError } from "axios";
import * as Sentry from "@sentry/react-native";
import {
  ConsumerProxyFailureSchema,
  TConsumerProxyFailure,
} from "@/modules/core/schemas/ConsumerProxyResponseSchema";

const getErrorMessage = (failure: TConsumerProxyFailure) =>
  typeof failure.error === "string" && failure.error
    ? failure.error
    : "Server Error.";

export const getConsumerProxyFailure = (
  error: unknown,
): TConsumerProxyFailure | null => {
  const responseData = isAxiosError(error) ? error.response?.data : error;
  const parsed = ConsumerProxyFailureSchema.safeParse(responseData);
  return parsed.success ? parsed.data : null;
};

export class ConsumerProxyRequestError extends Error {
  readonly failure: TConsumerProxyFailure;
  readonly errorCode: number;

  constructor(failure: TConsumerProxyFailure) {
    super(getErrorMessage(failure), { cause: failure });
    this.name = "ConsumerProxyRequestError";
    this.failure = failure;
    this.errorCode = failure.errorCode;
  }
}

export const handleError = (error: unknown) => {
  const failure = getConsumerProxyFailure(error);
  if (failure) {
    Sentry.captureException(failure);
    return `${getErrorMessage(failure)} Please contact bazzarify support`;
  }

  if (isAxiosError(error)) {
    if (error.response) {
      Sentry.captureException(error.response);
      return "Server Error. Please contact bazzarify support";
    }
    if (error.request) {
      Sentry.captureException(error.request);
      return "Something went wrong. Please contact bazzarify support";
    }
  }

  Sentry.captureException(error);
  return "Unknown Error. Please contact bazzarify support";
};
