import React, { useState, useCallback } from "react";
import { PortalContext, PortalRenderer } from "./PortalContext";
import { PortalHost } from "./PortalHost";

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const [portalContent, setPortalContent] = useState<PortalRenderer | null>(null);

  const openPortal = useCallback((renderer: PortalRenderer) => {
    setPortalContent(() => renderer);
  }, []);

  const closePortal = useCallback(() => {
    setPortalContent(null);
  }, []);

  return (
    <PortalContext.Provider value={{ portalContent, openPortal, closePortal }}>
      {children}
      <PortalHost />
    </PortalContext.Provider>
  );
};
