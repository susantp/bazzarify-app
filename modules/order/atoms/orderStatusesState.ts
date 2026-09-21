import { atom } from "jotai";
import { TCustomerOrderStatusGroup } from "@/modules/order/schemas/CustomerOrderStatusGroupSchema";

export const orderStatusesState = atom<TCustomerOrderStatusGroup[]>([]);
