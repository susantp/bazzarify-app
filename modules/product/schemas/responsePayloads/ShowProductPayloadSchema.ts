import { z } from "zod";
import { ProductWithVariantAndImageSchema } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

export const ShowProductPayloadSchema = z
  .object({
    product: ProductWithVariantAndImageSchema,
    currency: z
      .object({
        code: z.string(),
      })
      .strip(),
  })
  .strip();

export type IProductShowPayload = z.infer<typeof ShowProductPayloadSchema>;
