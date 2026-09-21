import { Setter } from "@/modules/core/types";
import { AuthStatus } from "@/modules/auth/atoms/authStatusAtom";
import { hydrateToken } from "@/modules/auth/utils";

export function createTokenTask(
  setToken: Setter<string | null>,
  setAuthStatus: Setter<AuthStatus>,
) {
  return async () => {
    console.log("TOKEN_TASK_START");
    await hydrateToken(setToken, setAuthStatus);
  };
}
