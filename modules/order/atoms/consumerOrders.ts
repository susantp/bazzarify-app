import { atom } from "jotai";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";

export const consumerOrders = atom<TGetOrdersResponsePayload | null>(null);
