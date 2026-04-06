import { z } from "zod";

export const CustomerOrderStatusGroupSchema = z
  .object({
    code: z.string(),
    label: z.string(),
    statuses: z.array(z.string()).optional(),
  })
  .strip();

export const CustomerOrderStatusGroupsSchema = z.array(
  CustomerOrderStatusGroupSchema,
);

export type TCustomerOrderStatusGroup = z.infer<
  typeof CustomerOrderStatusGroupSchema
>;
