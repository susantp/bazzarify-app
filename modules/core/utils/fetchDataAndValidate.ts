import { z } from "zod";
import { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";

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
    if (error instanceof AxiosError) {
      console.log("fetch and validate error: ", error, error.cause);
    }
    const err = new Error(errorMessage, { cause: error });
    Sentry.captureException(err);
    throw err;
  }
  const parsed = responsePayloadSchema.safeParse(upstream.data);

  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    Sentry.captureException(issues);
    throw new Error("API response schema validation failed", { cause: issues });
  }

  return parsed.data;
}
