import { Stack } from "expo-router";
import React from "react";
import CoreProviders from "@/modules/core/providers/coreProviders";
import { useAtomValue } from "jotai";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

function AuthenticatedRoot() {
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="products/[uuid]" options={{ headerShown: false }} />
      <Stack.Screen name="vendor/[vendorUuid]" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function GuestRoot() {
  return (
    <Stack>
      <Stack.Screen name="(guest)" options={{ headerShown: false }} />
      <Stack.Screen name="products/[uuid]" options={{ headerShown: false }} />
      <Stack.Screen name="vendor/[vendorUuid]" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function AppLayout() {
  const authStatus = useAtomValue(authStatusAtom);

  // CRITICAL: prevent router from mounting any navigator
  if (authStatus === "unknown") {
    return null;
  }

  return (
    <CoreProviders>
      {authStatus === "authenticated" ? <AuthenticatedRoot /> : <GuestRoot />}
    </CoreProviders>
  );
}

