import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import { useState } from "react";
import { Href, router } from "expo-router";
import { useSetAtom } from "jotai";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import { setStorage } from "@/modules/core/utils/secureStore";
import { USER_KEY } from "@/modules/auth/config";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { consumeAuthRedirect } from "@/modules/core/utils/authRedirect";
import { clearAuthToken, setAuthToken } from "@/modules/auth/utils/token";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const setUser = useSetAtom(userAtom);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const navigateAfterAuth = async () => {
    const target = await consumeAuthRedirect();
    const destination = (target || "/account/profile") as Href;
    router.replace(destination);
  };

  const handleAfterLoginFlow = async (token: string) => {
    const userResponse: TUserPayload | null = await actionGetUser(token);
    if (!userResponse || !userResponse.user) {
      Sentry.captureMessage(
        "Process fetching user with token - failed" +
          JSON.stringify(userResponse),
      );
      await clearAuthToken();
      return;
    }
    setUser(userResponse.user);
    await setAuthToken(token);
    await setStorage(USER_KEY, JSON.stringify(userResponse.user));
  };

  const handleOAuthLogin = async (provider: LoginProvider) => {
    setIsAuthenticating(true);
    try {
      const token = await actionOAuthLogin(provider);
      await handleAfterLoginFlow(token);

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });

      await navigateAfterAuth();
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
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleCredentialsLogin = async (data: TLoginFormField) => {
    setIsAuthenticating(true);
    try {
      const token = await actionLogin(data);
      await handleAfterLoginFlow(token);

      Toast.show({
        position: "bottom",
        text1: "Login successful.",
        type: "success",
      });
      await navigateAfterAuth();
    } catch (error) {
      Sentry.captureException(error);
      Toast.show({
        position: "bottom",
        text1: "Sorry process failed",
        text2: error instanceof Error ? error.message : undefined,
        type: "error",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    showPassword,
    isAuthenticating,
    handleOAuthLogin,
    handleCredentialsLogin,
    handleShowPassword,
  };
}
