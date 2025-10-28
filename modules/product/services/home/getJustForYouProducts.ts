import { axiosInstance } from "@/modules/core/utils/axios";
import { AxiosResponse } from "axios";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { IJustForYouProductsPayload } from "@/modules/product/types/payloads";
import { JustForYouProductsPayloadSchema } from "@/modules/product/schemas/responsePayloads/JustForYouProductsPayloadSchema";

export default async function getJustForYouProducts(
  params?: Record<string, string>,
): Promise<IJustForYouProductsPayload> {
  const upstreamRequestPath = "/home/getJustForYouProducts";
  let upstream: AxiosResponse<unknown>;

  try {
    upstream = await axiosInstance.get(upstreamRequestPath, {
      params: params,
    });
  } catch (error: unknown) {
    const err = new Error("Unable to just for you products", {
      cause: error,
    });
    Sentry.captureException(err);
    throw err;
  }

  const parsed = DataSchema(JustForYouProductsPayloadSchema).safeParse(
    upstream.data,
  );

  if (!parsed.success) {
    Sentry.captureException(formattedIssues(parsed.error.issues));
    throw new Error("Api response schema validation failed", {
      cause: formattedIssues(parsed.error.issues),
    });
  }

  return parsed.data.payload as IJustForYouProductsPayload;
}
