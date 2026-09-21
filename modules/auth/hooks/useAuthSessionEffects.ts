import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import * as Sentry from "@sentry/react-native";
import Toast from "react-native-toast-message";
import { authSessionAtom, authSessionEventAtom } from "@/modules/auth/atoms/authSessionAtom";
import { cartAtom } from "@/modules/cart/atoms";
import { addressListAtom } from "@/modules/user/atoms/addresessAtom";
import hydrateCart from "@/modules/cart/utils/hydrateCart";
import hydrateAddresses from "@/modules/auth/utils/hydrateAddresses";
import { subscribeOnResume } from "@/modules/core/utils";
import { Setter } from "@/modules/core/types";
import { TAddCartPayload } from "@/modules/cart/schemas/responsePayloads/CartResponsePayload";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { ordersState } from "@/modules/order/atoms/ordersState";
import { orderStatusesState } from "@/modules/order/atoms/orderStatusesState";
import { TGetOrdersResponsePayload } from "@/modules/order/schemas/responsePayloads/GetOrdersResponsePayload";
import hydrateOrderSummary from "@/modules/order/utils/hydrateOrderSummary";
import { TCustomerOrderStatusGroup } from "@/modules/order/schemas/CustomerOrderStatusGroupSchema";

async function hydrateAuthenticatedData({
  token,
  setCart,
  setAddresses,
  setOrders,
  setOrderStatuses,
}: {
  token: string;
  setCart: Setter<TAddCartPayload | null>;
  setAddresses: Setter<TUserAddress[] | null | undefined>;
  setOrders: Setter<TGetOrdersResponsePayload | null>;
  setOrderStatuses: Setter<TCustomerOrderStatusGroup[]>;
}) {
  const [cartResult, addressResult, ordersResult] = await Promise.allSettled([
    hydrateCart(setCart, token),
    hydrateAddresses(setAddresses, token),
    hydrateOrderSummary({
      token,
      setOrders,
      setOrderStatuses,
    }),
  ]);

  if (cartResult.status === "rejected") {
    Sentry.captureException(
      new Error("Failed to hydrate cart from authenticated session", {
        cause: cartResult.reason,
      }),
    );
  }

  if (addressResult.status === "rejected") {
    Sentry.captureException(
      new Error("Failed to hydrate addresses from authenticated session", {
        cause: addressResult.reason,
      }),
    );
  }

  if (ordersResult.status === "rejected") {
    setOrders(null);
    setOrderStatuses([]);
    Sentry.captureException(
      new Error("Failed to hydrate orders from authenticated session", {
        cause: ordersResult.reason,
      }),
    );
  }
}

export default function useAuthSessionEffects() {
  const session = useAtomValue(authSessionAtom);
  const sessionEvent = useAtomValue(authSessionEventAtom);
  const setCart = useSetAtom(cartAtom);
  const setAddresses = useSetAtom(addressListAtom);
  const setOrders = useSetAtom(ordersState);
  const setOrderStatuses = useSetAtom(orderStatusesState);
  const lastHydratedTokenRef = useRef<string | null>(null);
  const lastHandledEventIdRef = useRef(0);

  useEffect(() => {
    if (session.phase !== "authenticated" || !session.token) {
      lastHydratedTokenRef.current = null;
      return;
    }

    if (lastHydratedTokenRef.current === session.token) {
      return;
    }

    lastHydratedTokenRef.current = session.token;

    hydrateAuthenticatedData({
      token: session.token,
      setCart,
      setAddresses,
      setOrders,
      setOrderStatuses,
    }).then(() => undefined);
  }, [
    session.phase,
    session.token,
    setAddresses,
    setCart,
    setOrders,
    setOrderStatuses,
  ]);

  useEffect(() => {
    if (session.phase !== "authenticated" || !session.token) {
      return;
    }

    const unsubscribe = subscribeOnResume(() => {
      hydrateAuthenticatedData({
        token: session.token!,
        setCart,
        setAddresses,
        setOrders,
        setOrderStatuses,
      }).then(() => undefined);
    });

    return unsubscribe;
  }, [
    session.phase,
    session.token,
    setAddresses,
    setCart,
    setOrders,
    setOrderStatuses,
  ]);

  useEffect(() => {
    if (!sessionEvent || sessionEvent.id === lastHandledEventIdRef.current) {
      return;
    }

    lastHandledEventIdRef.current = sessionEvent.id;

    if (sessionEvent.type === "login_succeeded") {
      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });
      return;
    }

    if (sessionEvent.type === "session_expired") {
      Toast.show({
        position: "bottom",
        text1: "Session expired",
        text2: "Please log in again.",
        type: "error",
      });
    }
  }, [sessionEvent]);
}
