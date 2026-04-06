import React from "react";
import CoreProviders from "@/modules/core/providers/coreProviders";
import BootstrapProvider from "@/modules/core/providers/bootstrapProvider";

export default function AppLayout() {
  return (
    <BootstrapProvider>
      <CoreProviders />
    </BootstrapProvider>
  );
}
