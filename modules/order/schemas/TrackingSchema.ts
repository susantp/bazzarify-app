import { z } from "zod";

export const OrderTrackingTimelineItemSchema = z
  .object({
    uuid: z.uuid(),
    status: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    changed_at: z.iso.datetime({ offset: true }).nullable(),
    is_current: z.boolean(),
  })
  .strip();

export const OrderEstimatedDeliveryWindowSchema = z
  .object({
    from: z.iso.date().nullable(),
    to: z.iso.date().nullable(),
  })
  .strip();

export const DeliveryTrackingUnitSchema = z
  .object({
    uuid: z.uuid(),
    store_name: z.string().nullable(),
    mode: z.enum(["tenant_managed", "vendor_managed"]),
    status: z.enum([
      "preparing",
      "ready_for_handoff",
      "handed_off",
      "in_transit",
      "partially_delivered",
      "delivered",
      "failed",
      "canceled",
    ]),
    tracking_reference: z.string().nullable(),
    items: z.array(
      z
        .object({
          order_item_uuid: z.uuid(),
          name: z.string().nullable(),
          quantity: z.number().int().nonnegative(),
          prepared: z.number().int().nonnegative(),
          handed_off: z.number().int().nonnegative(),
          delivered: z.number().int().nonnegative(),
          canceled: z.number().int().nonnegative(),
        })
        .strip(),
    ),
    timeline: z.array(
      z
        .object({
          uuid: z.uuid(),
          type: z.enum([
            "prepared",
            "handed_off",
            "picked_up",
            "in_transit",
            "delivered",
            "failed_attempt",
            "canceled",
            "assigned",
          ]),
          occurred_at: z.iso.datetime({ offset: true }).nullable(),
        })
        .strip(),
    ),
  })
  .strip();

export const OrderTrackingSchema = z
  .object({
    order_uuid: z.uuid(),
    order_number: z.string(),
    tracking_number: z.string().nullable(),
    current_status: z.string().nullable(),
    estimated_delivery_window: OrderEstimatedDeliveryWindowSchema,
    timeline: z.array(OrderTrackingTimelineItemSchema),
    delivery_units: z.array(DeliveryTrackingUnitSchema),
  })
  .strip();

export type TOrderTrackingTimelineItem = z.infer<
  typeof OrderTrackingTimelineItemSchema
>;
export type TOrderEstimatedDeliveryWindow = z.infer<
  typeof OrderEstimatedDeliveryWindowSchema
>;
export type TOrderTracking = z.infer<typeof OrderTrackingSchema>;
export type TDeliveryTrackingUnit = z.infer<typeof DeliveryTrackingUnitSchema>;
