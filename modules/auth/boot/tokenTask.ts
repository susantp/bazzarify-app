import { Setter } from "@/modules/core/types";
import { hydrateToken } from "@/modules/auth/utils";

export function createTokenTask(setToken: Setter<string | null>) {
  return async () => {
    await hydrateToken(setToken);
  };
}
