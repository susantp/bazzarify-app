import { z } from "zod";
import { ProductWithVariantAndImageSchema } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

export const ShowProductPayloadSchema = z
  .object({
    product: ProductWithVariantAndImageSchema,
  })
  .strip();

export type IProductShowPayload = z.infer<typeof ShowProductPayloadSchema>;
