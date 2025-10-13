import { atom } from "jotai";
import { TOrderTotals } from "@/modules/order/schemas/orderSchema";

export const orderTotalsAfterOrderCreation = atom<TOrderTotals | null>(null);
