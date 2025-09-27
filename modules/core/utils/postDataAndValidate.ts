import { z } from "zod";
import { AxiosResponse } from "axios";
import { authAxiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";

export interface IPostDataAndValidate<
  RQ extends z.ZodType,
  RS extends z.ZodType,
> {
  endpoint: string;
  requestPayloadSchema: RQ;
  responsePayloadSchema: RS;
  errorMessage: string;
  token: string;
}
export default async function postDataAndValidate<
  RQ extends z.ZodType,
  RS extends z.ZodType,
>(params: IPostDataAndValidate<RQ, RS>): Promise<z.infer<RS>> {
  const {
    token,
    requestPayloadSchema,
    responsePayloadSchema,
    errorMessage,
    endpoint,
  } = params;
  const instance = await authAxiosInstance(token);
  let upstream: AxiosResponse<unknown>;
  if (!instance) {
    throw new Error("Authentication error.");
  }
  try {
    upstream = await instance.post(endpoint, requestPayloadSchema);
  } catch (error: unknown) {
    const err = new Error(errorMessage, { cause: error });
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
