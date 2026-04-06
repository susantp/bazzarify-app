import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import { AuthCompletionEvent } from "@/modules/auth/domain/AuthCompletionEvent";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { ordersState } from "@/modules/order/atoms/ordersState";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { authRouteHoldAtom } from "@/modules/auth/atoms/authRouteHoldAtom";
import {
  clearAuthSession,
  setAuthenticatedSession,
} from "@/modules/auth/utils/token";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
  const setOrders = useSetAtom(ordersState);
  const setAuthRouteHold = useSetAtom(authRouteHoldAtom);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleAfterLoginFlow = async (
    event: AuthCompletionEvent,
  ): Promise<boolean> => {
    const { token } = event;
    const userResponse: TUserPayload | null = await actionGetUser(token);
    if (!userResponse || !userResponse.user) {
      Sentry.captureMessage(
        "Process fetching user with token - failed" +
          JSON.stringify(userResponse),
      );
      await clearAuthSession();
      setAuthRouteHold(false);
      return false;
    }

    await setAuthenticatedSession({
      token,
      user: userResponse.user,
    });

    try {
      const orders = await actionGetOrders(token);
      setOrders(orders);
    } catch (error) {
      setOrders(null);
      Sentry.captureException(
        new Error("Failed to hydrate orders after login", {
          cause: error,
        }),
      );
    }

    return true;
  };

  const handleOAuthLogin = async (provider: LoginProvider) => {
    setAuthRouteHold(true);
    try {
      const completionEvent = await actionOAuthLogin(provider);
      const isResolved = await handleAfterLoginFlow(completionEvent);
      if (!isResolved) {
        return;
      }

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });
    } catch (error) {
      setAuthRouteHold(false);
      Sentry.captureException(error);
      Toast.show({
        position: "bottom",
        text1: "please try again later.",
        text2:
          error instanceof Error ? error.message : "Sorry cannot login now !",
        type: "error",
      });
    }
  };

  const handleCredentialsLogin = async (data: TLoginFormField) => {
    setAuthRouteHold(true);
    try {
      const token = await actionLogin(data);
      const isResolved = await handleAfterLoginFlow({ token });
      if (!isResolved) {
        return;
      }

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });
    } catch (error) {
      setAuthRouteHold(false);
      Sentry.captureException(error);
      Toast.show({
        position: "bottom",
        text1: "Sorry process failed",
        text2: error instanceof Error ? error.message : undefined,
        type: "error",
      });
    }
  };

  return {
    showPassword,
    handleOAuthLogin,
    handleCredentialsLogin,
    handleShowPassword,
  };
}
