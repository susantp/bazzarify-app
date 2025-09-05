import { z } from "zod";
import { VariantSchema } from "@/modules/product/schemas/VariantSchema";

export const OrderSchema = z
  .object({
    uuid: z.uuid(),
    buyer_uuid: z.uuid(),
    buyer_type: z.string(),
    order_number: z.string(),
    status: z.string().max(32),
    sub_total: z.number().int().nonnegative().default(0),
    discount_total: z.number().int().nonnegative().default(0),
    tax_total: z.number().int().nonnegative().default(0),
    shipping_total: z.number().int().nonnegative().default(0),
    grand_total: z.number().int().nonnegative().default(0),
    payment_status: z.string().max(32),
    placed_at: z.iso.datetime(),
    cancelled_at: z.iso.datetime().nullable().optional(),
    completed_at: z.iso.datetime().nullable().optional(),
    created_at: z.iso.datetime().optional().optional(),
    updated_at: z.iso.datetime().optional().optional(),
    deleted_at: z.iso.datetime().nullable().optional(),
  })
  .strict();

export const OrderItemSchema = z
  .object({
    uuid: z.uuid(),
    order_uuid: z.uuid(),
    orderable_uuid: z.uuid(),
    orderable_type: z.string(),

    // immutable snapshots
    sku: z.string(),
    name: z.string(),
    variant_attrs: VariantSchema.pick({
      uuid: true,
      name: true,
      sku: true,
    })
      .strict()
      .nullable(),
    qty_ordered: z.number().int().nonnegative(),
    qty_canceled: z.number().int().nonnegative().default(0),
    qty_shipped: z.number().int().nonnegative().default(0),
    qty_refunded: z.number().int().nonnegative().default(0),

    unit_price: z.number().int().nonnegative(),
    row_discount: z.number().int().nonnegative().default(0),
    row_tax: z.number().int().nonnegative().default(0),
    row_total: z.float64().nonnegative().nonoptional(),

    meta: z.record(z.any(), z.string()).nullable(), // JSON column
    created_at: z.iso.datetime().optional(),
    updated_at: z.iso.datetime().optional(),
    deleted_at: z.iso.datetime().nullable().optional(),
  })
  .strict();
export const CartItem = OrderItemSchema.pick({
  uuid: true,
  name: true,
  sku: true,
  variant_attrs: true,
  row_total: true,
  qty_ordered: true,
  unit_price: true,
});
export const Cart = OrderSchema.pick({
  sub_total: true,
})
  .extend({
    items: z.array(CartItem).nonempty().nullable(),
  })
  .strict()
  .nullable();

export type TCartItem = z.infer<typeof CartItem>;
export type TOrder = z.infer<typeof OrderSchema>;
export type TOrderItem = z.infer<typeof OrderItemSchema>;
export type TCart = z.infer<typeof Cart>;
