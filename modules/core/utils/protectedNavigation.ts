import { Href, router } from "expo-router";
import { setAuthRedirect } from "@/modules/core/utils/authRedirect";

const LOGIN_ROUTE = "/auth/login" as Href;

type NavigationMode = "push" | "replace";

export async function routeGuestToLoginForProtectedTarget(
  target: string,
  navigationMode: NavigationMode = "push",
) {
  await setAuthRedirect(target);

  if (navigationMode === "replace") {
    router.replace(LOGIN_ROUTE);
    return;
  }

  router.push(LOGIN_ROUTE);
}
