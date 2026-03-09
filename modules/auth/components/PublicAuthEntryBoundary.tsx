import { PropsWithChildren } from "react";
import { Redirect } from "expo-router";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

export default function PublicAuthEntryBoundary({
  children,
}: PropsWithChildren) {
  const authStatus = useAtomValue(authStatusAtom);

  if (authStatus === "authenticated") {
    return <Redirect href="/account/profile" />;
  }

  return children;
}
