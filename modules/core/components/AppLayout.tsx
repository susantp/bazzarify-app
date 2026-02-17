import React from "react";
import CoreProviders from "@/modules/core/providers/coreProviders";
import BootstrapProvider from "@/modules/core/providers/bootstrapProvider";

export default function AppLayout() {
  console.log("APP_LAYOUT_RENDER");
  return (
    <BootstrapProvider>
      <CoreProviders />
    </BootstrapProvider>
  );
}
