import { z } from "zod";
import UserSchema from "@/modules/auth/schemas/UserSchema";

const UserPayloadSchema = z
  .object({
    user: UserSchema,
  })
  .strip();
export type TUserPayload = z.infer<typeof UserPayloadSchema>;
export default UserPayloadSchema;
