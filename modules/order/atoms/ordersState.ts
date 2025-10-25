import { atom } from "jotai";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";

export const ordersState = atom<TGetOrdersResponsePayload | null>(null);
