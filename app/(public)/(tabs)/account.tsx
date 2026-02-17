import { useAtomValue } from "jotai";
import { Redirect } from "expo-router";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

export default function AccountEntry() {
  const authStatus = useAtomValue(authStatusAtom);

  if (authStatus === "authenticated") {
    return <Redirect href="/account/profile" />;
  }

  return <Redirect href="/guestAccountIndex" />;
}
