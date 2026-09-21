import React, { createContext } from "react";

export type PortalRenderer = () => React.ReactNode;

export type PortalContextType = {
  openPortal: (renderer: PortalRenderer) => void;
  closePortal: () => void;
  portalContent: PortalRenderer | null;
};

export const PortalContext = createContext<PortalContextType>({
  openPortal: () => {},
  closePortal: () => {},
  portalContent: null,
});
