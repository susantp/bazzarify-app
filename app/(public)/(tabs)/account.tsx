import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import GuestAccountLandingScreen from "@/modules/auth/screens/GuestAccountLandingScreen";
import AccountProfileScreen from "@/modules/account/screens/AccountProfileScreen";

export default function AccountEntry() {
  const authStatus = useAtomValue(authStatusAtom);

  if (authStatus === "authenticated") {
    return <AccountProfileScreen />;
  }

  return <GuestAccountLandingScreen />;
}
