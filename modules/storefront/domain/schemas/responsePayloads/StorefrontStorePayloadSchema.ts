import { z } from "zod";
import { StoreSchema } from "@/modules/storefront/domain/schemas/StoreSchema";

export const StorefrontStorePayloadSchema = z
  .object({
    store: StoreSchema.nullable(),
    currency: z.object({
      code: z.string(),
    }),
  })
  .strip();
