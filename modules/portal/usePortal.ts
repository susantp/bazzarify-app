import { useContext } from "react";
import { PortalContext } from "./PortalContext";

export const usePortal = () => {
  return useContext(PortalContext);
};
