import { z } from "zod";

const unavailableFields = {
  reason: z.string().min(1),
  currency: z.null(),
  amount_minor: z.null(),
  estimate_from: z.null(),
  estimate_to: z.null(),
  timezone: z.null(),
  quoted_at: z.null(),
  revision: z.null(),
  expires_at: z.null(),
};

export const ProductDeliveryQuoteSchema = z.discriminatedUnion("status", [
  z.strictObject({
    status: z.literal("available"),
    reason: z.null(),
    currency: z.string().regex(/^[A-Z]{3}$/),
    amount_minor: z.number().int().nonnegative(),
    estimate_from: z.iso.date(),
    estimate_to: z.iso.date(),
    timezone: z.string().min(1),
    quoted_at: z.iso.datetime({ offset: true }),
    revision: z.string().regex(/^[a-f0-9]{64}$/),
    expires_at: z.iso.datetime({ offset: true }),
  }),
  z.strictObject({
    status: z.enum([
      "requires_destination",
      "requires_configuration",
      "unavailable",
      "unsupported",
    ]),
    ...unavailableFields,
  }),
]);
