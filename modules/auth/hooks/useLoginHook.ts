import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { ordersState } from "@/modules/order/atoms/ordersState";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { deleteStorage, setStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { tokenAtom } from "@/modules/auth/atoms/tokenAtom";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
  const setOrders = useSetAtom(ordersState);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleAfterLoginFlow = async (token: string): Promise<boolean> => {
    const userResponse: TUserPayload | null = await actionGetUser(token);
    if (!userResponse || !userResponse.user) {
      Sentry.captureMessage(
        "Process fetching user with token - failed" +
          JSON.stringify(userResponse),
      );
      await deleteStorage(AUTH_TOKEN_KEY);
      await deleteStorage(USER_KEY);
      setToken(null);
      setAuthStatus("guest");
      return false;
    }
    setUser(userResponse.user);
    const orders = await actionGetOrders(token);
    setOrders(orders);
    await setStorage(AUTH_TOKEN_KEY, token);
    await setStorage(USER_KEY, JSON.stringify(userResponse.user));
    setToken(token);
    setAuthStatus("authenticated");
    return true;
  };

  const handleOAuthLogin = async (provider: LoginProvider) => {
    try {
      const token = await actionOAuthLogin(provider);
      const isResolved = await handleAfterLoginFlow(token);
      if (!isResolved) {
        return;
      }

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });

    } catch (error) {
      console.log("OAuth login hook step: google", error);
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
    try {
      const token = await actionLogin(data);
      const isResolved = await handleAfterLoginFlow(token);
      if (!isResolved) {
        return;
      }

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });
    } catch (error) {
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
