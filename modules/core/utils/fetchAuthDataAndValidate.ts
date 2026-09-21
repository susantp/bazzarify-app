import { z } from "zod";
import { AxiosResponse } from "axios";
import { authAxiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import {
  ConsumerProxyRequestError,
  getConsumerProxyFailure,
} from "@/modules/core/utils/handleError";

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
    const failure = getConsumerProxyFailure(error);
    const err = failure
      ? new ConsumerProxyRequestError(failure)
      : new Error(errorMessage, { cause: error });
    Sentry.captureException(err);
    throw err;
  }
  const parsed = responsePayloadSchema.safeParse(upstream.data);

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    console.log("fetchAndValidate", issues);
    Sentry.captureException(issues);
    throw new Error("API response schema validation failed", { cause: issues });
  }

  return parsed.data;
}
