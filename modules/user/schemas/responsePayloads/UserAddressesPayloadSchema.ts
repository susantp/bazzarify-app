import { z } from "zod";
import { UserAddress } from "@/modules/user/schemas/UserAddress";

export const UserAddressesPayloadSchema = z
  .object({
    addresses: z.array(UserAddress).nullable(),
  })
  .strip();

export type TUserAddressesPayload = z.infer<typeof UserAddress>;
