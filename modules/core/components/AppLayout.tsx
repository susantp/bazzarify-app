import { Stack } from "expo-router";
import React from "react";
import CoreProviders from "@/modules/core/providers/coreProviders";

export default function AppLayout() {
  return (
    <CoreProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </CoreProviders>
  );
}
