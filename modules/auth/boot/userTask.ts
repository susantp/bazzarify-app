import { Setter } from "@/modules/core/types";
import { hydrateUser } from "@/modules/auth/utils";
import { TUser } from "@/modules/auth/schemas/UserSchema";

export function createUserTask(setUser: Setter<TUser | null>) {
  return async () => {
    await hydrateUser(setUser);
  };
}
