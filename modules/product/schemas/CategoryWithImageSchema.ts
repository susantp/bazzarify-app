import { ImageSchema } from "@/modules/product/schemas/ImageSchema";
import { z } from "zod";
import { CategoryCore } from "@/modules/product/schemas/CategorySchema";

export const CategoryCoreWithImageSchema = CategoryCore.omit({
  id: true,
  position: true,
  specifications: true,
  attributes: true,
})
  .extend({
    images: z.array(ImageSchema).optional(),
  })
  .strict();

export const CategoryRecursiveWithImageSchema: typeof CategoryCoreWithImageSchema =
  CategoryCoreWithImageSchema.extend({
    parent: z.lazy(() => CategoryRecursiveWithImageSchema).optional(),
    children: z
      .array(z.lazy(() => CategoryRecursiveWithImageSchema))
      .optional(),
  });
