import { z } from "zod";
import { ImageSchema } from "@/modules/product/schemas/ImageSchema";

export const CategoryCore = z
  .object({
    uuid: z.uuid(),
    id: z.string().optional(),
    name: z.string(),
    position: z.string().optional(),
    slug: z.string(),
    image_base_path: z.string(),
    image_base_url: z.string(),
    icon_base_path: z.string(),
    icon_base_url: z.string(),
    specifications: z.array(z.string()).optional(),
    attributes: z.array(z.string()).optional(),
  })
  .strip();

export const CategoryWithImageSchema = CategoryCore.pick({
  uuid: true,
  slug: true,
  name: true,
  image_base_path: true,
  image_base_url: true,
  icon_base_url: true,
  icon_base_path: true,
})
  .extend({
    images: z.array(ImageSchema).optional(),
  })
  .strip();

export const CategoryRecursiveWithImageSchema = CategoryWithImageSchema.extend({
  parent: CategoryWithImageSchema.nullable().optional(),
  children: z.array(CategoryWithImageSchema).optional(),
  images: z.array(ImageSchema).optional(),
});

export type TCategoryWithImage = z.infer<typeof CategoryWithImageSchema>;
export type TCategoryRecursiveWithImage = z.infer<
  typeof CategoryRecursiveWithImageSchema
>;
