import { atom } from "jotai";

// Holds route-tree mounting during auth transitions so resolver can own navigation.
export const authRouteHoldAtom = atom(false);
