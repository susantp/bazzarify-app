import { z } from "zod";

export const UserAddress = z.object({
  uuid: z.uuid(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string(),
  user_uuid: z.uuid(),
  is_default: z.boolean().default(false),
});
export const UserUuid = UserAddress.pick({
  uuid: true,
});
export const AddressDefault = UserAddress.pick({
  is_default: true,
});

export type TUserUuid = z.infer<typeof UserUuid>;
export type TUserAddress = z.infer<typeof UserAddress>;
export type TAddressDefault = z.infer<typeof AddressDefault>;
