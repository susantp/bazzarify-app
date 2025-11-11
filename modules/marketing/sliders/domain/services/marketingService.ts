import { DataSchema } from "@/modules/core/schemas/DataSchema";
import fetchDataAndValidate from "@/modules/core/utils/fetchDataAndValidate";
import {
  HomeSlidersPayloadSchema,
  THomeSlidersPayloadSchema,
} from "@/modules/marketing/sliders/domain/schemas/responsePayload/HomeSlidersPayloadSchema";

async function getHomeSliders(): Promise<THomeSlidersPayloadSchema | null> {
  const response = await fetchDataAndValidate(
    "/home/getHomeSliders",
    DataSchema(HomeSlidersPayloadSchema),
    "Unable to fetch home sliders",
  );

  return response.payload;
}

const marketingService = {
  getHomeSliders,
};
export default marketingService;
