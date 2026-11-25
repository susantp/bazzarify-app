import { isCancel } from "axios";
import { ApiResponseSchema } from "@/modules/core/schemas/ApiResponseSchema";
import { axiosInstance } from "@/modules/core/utils/axios";
import { ProductDeliveryQuoteSchema } from "@/modules/product/schemas/ProductDeliveryQuoteSchema";

export async function getProductDeliveryQuote(
  productUuid: string,
  variantUuid: string,
  quantity: number,
  destination: {
    country: string;
    region: string;
    city: string;
    postal_code: string;
  },
  signal: AbortSignal,
) {
  try {
    const response = await axiosInstance.post<unknown>(
      `/product/${productUuid}/delivery-quote`,
      { variant_uuid: variantUuid, quantity, destination },
      { signal },
    );
    const result = ApiResponseSchema(ProductDeliveryQuoteSchema).safeParse(
      response.data,
    );
    if (
      !result.success ||
      result.data.metaData.error !== "" ||
      !result.data.data.payload
    ) {
      throw new Error("Unexpected delivery estimate response.");
    }
    return result.data.data.payload;
  } catch (error) {
    if (!isCancel(error))
      console.error("[product-delivery-quote] request failed");
    throw error;
  }
}
