import { z } from "zod";

export const OrderTrackingTimelineItemSchema = z
  .object({
    status: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    changed_at: z.iso.datetime().nullable(),
    is_current: z.boolean(),
  })
  .strip();

export const OrderEstimatedDeliveryWindowSchema = z
  .object({
    from: z.iso.date().nullable(),
    to: z.iso.date().nullable(),
  })
  .strip();

export const OrderTrackingSchema = z
  .object({
    order_uuid: z.uuid(),
    order_number: z.string(),
    tracking_number: z.string(),
    current_status: z.string().nullable(),
    estimated_delivery_window: OrderEstimatedDeliveryWindowSchema,
    timeline: z.array(OrderTrackingTimelineItemSchema),
  })
  .strip();

export type TOrderTrackingTimelineItem = z.infer<
  typeof OrderTrackingTimelineItemSchema
>;
export type TOrderEstimatedDeliveryWindow = z.infer<
  typeof OrderEstimatedDeliveryWindowSchema
>;
export type TOrderTracking = z.infer<typeof OrderTrackingSchema>;
