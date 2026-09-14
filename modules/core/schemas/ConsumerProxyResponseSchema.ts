import { z } from "zod";
import { DataSchema } from "@/modules/core/schemas/DataSchema";

const SchemaIssueSchema = z.object({
  path: z.string(),
  message: z.string(),
  code: z.string(),
});

export const ConsumerProxyErrorSchema = z
  .union([
    z.string(),
    z.record(z.string(), z.unknown()),
    z.array(SchemaIssueSchema),
  ])
  .nullable();

export const ConsumerProxyFailureSchema = z
  .object({
    error: ConsumerProxyErrorSchema,
    errorCode: z.number().int(),
  })
  .strict();

export const ConsumerProxySuccessSchema = <T extends z.ZodTypeAny>(
  payloadItem: T,
) => DataSchema(payloadItem);

export const ConsumerProxyResponseSchema = <T extends z.ZodTypeAny>(
  payloadItem: T,
) =>
  z.union([
    ConsumerProxySuccessSchema(payloadItem),
    ConsumerProxyFailureSchema,
  ]);

export type TConsumerProxyFailure = z.infer<typeof ConsumerProxyFailureSchema>;
