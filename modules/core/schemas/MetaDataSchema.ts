import { z } from "zod";
import { ConsumerProxyErrorSchema } from "@/modules/core/schemas/ConsumerProxyResponseSchema";

export const MetaDataSchema = z
  .object({
    // Backend: MetaDataDTO and bootstrap/app.php emit strings, keyed records, or null.
    error: ConsumerProxyErrorSchema,
    executionTime: z.number().nullable().optional(),
    errorCode: z.number().nullable(),
  })
  .strict();
