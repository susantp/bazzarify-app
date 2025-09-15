import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import processAuth from "@/modules/auth/services";
import { useState } from "react";
import { router } from "expo-router";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleOAuthLogin = async (provider: LoginProvider) => {
    try {
      const token = await actionOAuthLogin(provider);
      await processAuth(token);

      Toast.show({
        position: "bottom",
        text1: "Login Success.",
        type: "success",
      });

      router.replace("/account/profile");
    } catch (error) {
      Sentry.captureException(error);
      Toast.show({
        position: "bottom",
        text1: "Sorry process failed",
        type: "error",
      });
    }
  };

  const handleCredentialsLogin = async (data: TLoginFormField) => {
    try {
      const token = await actionLogin(data);
      await processAuth(token);

      Toast.show({
        position: "bottom",
        text1: token as string,
        type: "success",
      });
    } catch (error) {
      Sentry.captureException(error);
      Toast.show({
        position: "bottom",
        text1: "Sorry process failed",
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
