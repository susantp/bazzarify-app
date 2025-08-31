import axiosInstance from "@/modules/core/utils/axios";
import { AxiosResponse } from "axios";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { IPopularProductsPayload } from "@/modules/product/types/payloads";
import { PopularProductsPayloadSchema } from "@/modules/product/schemas/responsePayloads/PopularProductsPayloadSchema";

export default async function getPopularProducts(): Promise<IPopularProductsPayload> {
  const upstreamRequestPath = "/home/getPopularProducts";
  let upstream: AxiosResponse<unknown>;
  try {
    upstream = await axiosInstance.get(upstreamRequestPath);
  } catch (error: unknown) {
    const err = new Error("Unable to fetch flash deal products", {
      cause: error,
    });
    Sentry.captureException(err);
    throw err;
  }

  const parsed = DataSchema(PopularProductsPayloadSchema).safeParse(
    upstream.data,
  );

  if (!parsed.success) {
    Sentry.captureException(formattedIssues(parsed.error.issues));
    throw new Error("Api response schema validation failed", {
      cause: formattedIssues(parsed.error.issues),
    });
  }

  return parsed.data.payload as IPopularProductsPayload;
}
