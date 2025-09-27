import { z } from "zod";

export const AddCartItemPayload = z
  .object({
    cart: z
      .object({
        id: z.uuid().nullable(),
      })
      .nullable(),
  })
  .strict();

export type TAddCartItemPayload = z.infer<typeof AddCartItemPayload>;
