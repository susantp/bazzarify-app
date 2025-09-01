import axiosInstance from "@/modules/core/utils/axios";
import { AxiosResponse } from "axios";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { HomeCategoriesPayloadSchema } from "@/modules/product/schemas/responsePayloads/HomeCategoriesPayloadSchema";
import { ICategoryListWithImagePayload } from "@/modules/product/types/payloads";

export default async function getHomeCategories(): Promise<ICategoryListWithImagePayload> {
  const upstreamRequestPath = "/home/getHomeCategories";
  let upstream: AxiosResponse<unknown>;
  try {
    upstream = await axiosInstance.get(upstreamRequestPath);
  } catch (error: unknown) {
    const err = new Error("Unable to fetch home categories", {
      cause: error,
    });
    Sentry.captureException(err);
    throw err;
  }

  const parsed = DataSchema(HomeCategoriesPayloadSchema).safeParse(
    upstream.data,
  );

  if (!parsed.success) {
    Sentry.captureException(formattedIssues(parsed.error.issues));
    throw new Error("Api response schema validation failed", {
      cause: formattedIssues(parsed.error.issues),
    });
  }
  return parsed.data.payload as ICategoryListWithImagePayload;
}
