import { z } from "zod";
import { UserSchema } from "@/modules/auth/schemas/UserSchema";

export const UserAddress = z.object({
  uuid: z.uuid(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string().max(10, "Phone number should not exceed 10 digits"),
  user_uuid: z.uuid(),
  is_default: z.boolean().default(false),
});
export const UserUuid = UserAddress.pick({
  uuid: true,
});
export const UserAddressDefault = UserAddress.pick({
  uuid: true,
  is_default: true,
});

export const UserAddressCreate = UserAddress.pick({
  country: true,
  street: true,
  city: true,
  state: true,
  zip: true,
  phone: true,
});

export const ShippingInformationSchema = UserAddress.extend(
  UserSchema.pick({
    name: true,
    phone: true,
  }).shape,
);

export type TUserUuid = z.infer<typeof UserUuid>;
export type TUserAddress = z.infer<typeof UserAddress>;
export type TUserAddressDefault = z.infer<typeof UserAddressDefault>;
export type TUserAddressCreate = z.infer<typeof UserAddressCreate>;
export type TShippingInformation = z.infer<typeof ShippingInformationSchema>;
