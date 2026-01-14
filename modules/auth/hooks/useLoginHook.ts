import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import { useState } from "react";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { ordersState } from "@/modules/order/atoms/ordersState";
import actionGetOrders from "@/modules/order/actions/actionGetOrders";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { deleteStorage, setStorage } from "@/modules/core/utils/secureStore";
import { AUTH_TOKEN_KEY, USER_KEY } from "@/modules/auth/config";
import { userAtom } from "@/modules/auth/atoms/userAtom";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const setOrders = useSetAtom(ordersState);
  const setUser = useSetAtom(userAtom);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleAfterLoginFlow = async (token: string) => {
    const userResponse: TUserPayload | null = await actionGetUser(token);
    if (!userResponse || !userResponse.user) {
      Sentry.captureMessage(
        "Process fetching user with token - failed" +
          JSON.stringify(userResponse),
      );
      await deleteStorage(AUTH_TOKEN_KEY);
      await deleteStorage(USER_KEY);
      return;
    }
    setUser(userResponse.user);
    const orders = await actionGetOrders(token);
    setOrders(orders);
    await setStorage(AUTH_TOKEN_KEY, token);
    await setStorage(USER_KEY, JSON.stringify(userResponse.user));
  };

  const handleOAuthLogin = async (provider: LoginProvider) => {
    try {
      const token = await actionOAuthLogin(provider);
      await handleAfterLoginFlow(token);

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });

      router.replace("/account/profile");
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
    setIsAuthenticating(true);
    try {
      const token = await actionLogin(data);
      await handleAfterLoginFlow(token);

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });
      setIsAuthenticating(false);
      router.replace("/account/profile");
    } catch (error) {
      setIsAuthenticating(false);
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
    isAuthenticating,
    showPassword,
    handleOAuthLogin,
    handleCredentialsLogin,
    handleShowPassword,
  };
}
