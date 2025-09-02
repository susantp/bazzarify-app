import { z } from "zod";
import { ProductSchema } from "@/modules/product/schemas/ProductSchema";
import { ImageSchema } from "@/modules/product/schemas/ImageSchema";

export const VariantSchema = z
  .object({
    uuid: z.uuid(),
    product_uuid: z.uuid(),
    name: z.string(),
    price: z.number(),
    stock: z.number().int(),
    available: z.boolean(),
    image_base_path: z.string(),
    image_base_url: z.string(),
    product: ProductSchema,
  })
  .strict();
export const VariantListWithImageSchema = VariantSchema.extend({
  images: z.array(ImageSchema).nullable().optional(),
}).strict();
export type TVariant = z.infer<typeof VariantSchema>;
export type TVariantListWithImage = z.infer<typeof VariantListWithImageSchema>;
