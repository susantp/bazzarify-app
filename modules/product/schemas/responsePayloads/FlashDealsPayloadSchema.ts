import { z } from "zod";
import { ProductWithImageSchema } from "@/modules/product/schemas/ProductWithImageSchema";
import { SimplePaginatedSchema } from "@/modules/product/schemas/SimplePaginated";

export const FlashDealsPayloadSchema = z
  .object({
    flashDeals: z.union([
      SimplePaginatedSchema(ProductWithImageSchema),
      z.array(z.unknown()).length(0),
    ]),
  })
  .strip();
