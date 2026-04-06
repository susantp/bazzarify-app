import { TLoginFormField } from "@/components/common";
import actionOAuthLogin from "@/modules/auth/services/oAuthLogin";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import { AuthCompletionEvent } from "@/modules/auth/domain/AuthCompletionEvent";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";
import actionLogin from "@/modules/auth/services/credentialLogin";
import { useState } from "react";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import {
  beginAuthenticatingSession,
  clearAuthSession,
  setAuthenticatedSession,
} from "@/modules/auth/session/sessionController";

export default function useLoginHook() {
  const [showPassword, setShowPassword] = useState(true);
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
      return false;
    }

    await setAuthenticatedSession({
      token,
      user: userResponse.user,
    });

    return true;
  };

  const handleOAuthLogin = async (provider: LoginProvider) => {
    beginAuthenticatingSession();
    try {
      const completionEvent = await actionOAuthLogin(provider);
      const isResolved = await handleAfterLoginFlow(completionEvent);
      if (!isResolved) {
        return;
      }
    } catch (error) {
      await clearAuthSession();
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
    beginAuthenticatingSession();
    try {
      const token = await actionLogin(data);
      const isResolved = await handleAfterLoginFlow({ token });
      if (!isResolved) {
        return;
      }
    } catch (error) {
      await clearAuthSession();
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
