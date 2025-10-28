import { axiosInstance } from "@/modules/core/utils/axios";
import { FlashDealsPayloadSchema } from "@/modules/product/schemas/responsePayloads/FlashDealsPayloadSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { IFlashDealsPayload } from "@/modules/product/types/payloads";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import * as Sentry from "@sentry/react-native";
import { AxiosResponse } from "axios";

export default async function getFlashDealProducts(): Promise<IFlashDealsPayload> {
  const upstreamRequestPath = "/home/getFlashDealProducts";
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

  const parsed = DataSchema(FlashDealsPayloadSchema).safeParse(upstream.data);

  if (!parsed.success) {
    Sentry.captureException(formattedIssues(parsed.error.issues));
    throw new Error("Api response schema validation failed", {
      cause: formattedIssues(parsed.error.issues),
    });
  }

  return parsed.data.payload as IFlashDealsPayload;
}
