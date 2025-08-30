import { z } from "zod";
import { ICategory } from "@/modules/product/types/category";

export const CategoryCore = z
  .object({
    uuid: z.string(),
    id: z.string().optional(),
    name: z.string(),
    position: z.string().optional(),
    slug: z.string(),
    specifications: z.array(z.string()).optional(),
    attributes: z.array(z.string()).optional(),
  })
  .strict();
