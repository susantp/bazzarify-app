import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { useAtomValue } from "jotai";
import { Redirect } from "expo-router";

export default function RootIndex() {
  const authStatus = useAtomValue(authStatusAtom);

  if (authStatus === "unknown") {
    return <ThemedLoader />;
  }

  if (authStatus === "authenticated") {
    return <Redirect href="/(app)/(tabs)/account/profile" />;
  }

  return <Redirect href="/(guest)/guestAccountIndex" />;
}
