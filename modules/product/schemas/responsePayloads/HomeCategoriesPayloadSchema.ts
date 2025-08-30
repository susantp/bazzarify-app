import { z } from "zod";
import { SimplePaginatedSchema } from "@/modules/product/schemas/SimplePaginated";
import { CategoryCoreWithImageSchema } from "@/modules/product/schemas/CategoryWithImageSchema";

export const HomeCategoriesPayloadSchema = z
  .object({
    homeCategories: SimplePaginatedSchema(CategoryCoreWithImageSchema),
  })
  .strip();
