import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React, { useState } from "react";
import PageTitle from "@/components/account/PageTitle";
import { Link } from "expo-router";
import UsernameInput from "@/components/account/UsernameInput";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/common/ControlledInput";
import {
  IControlledFormFieldProps,
  TRegisterFormField,
} from "@/components/common";
import NameInput from "@/components/account/NameInput";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import actionRegister from "@/modules/auth/services/actionRegister";
import * as Sentry from "@sentry/react-native";
import Toast from "react-native-toast-message";
import { TUserPayload } from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import actionGetUser from "@/modules/auth/services/actionGetUser";
import {
  applyValidationFeedback,
  getValidationFeedback,
} from "@/modules/core/utils/validationFeedback";
import {
  beginAuthenticatingSession,
  clearAuthSession,
  setAuthenticatedSession,
} from "@/modules/auth/session/sessionController";

export default function RegisterScreen() {
  const [formValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormField>({
    defaultValues: formValues,
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);

  const handleAfterRegistrationFlow = async (
    token: string,
  ): Promise<boolean> => {
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

  const handleRegister = async (data: TRegisterFormField) => {
    beginAuthenticatingSession();
    try {
      const token = await actionRegister(data);
      const isResolved = await handleAfterRegistrationFlow(token);
      if (!isResolved) {
        return;
      }
    } catch (error) {
      await clearAuthSession();
      Sentry.captureException(error);
      const feedback = getValidationFeedback(error);
      if (feedback) {
        applyValidationFeedback(setError, feedback);
        Toast.show({
          position: "bottom",
          text1: feedback.summary,
          type: "error",
        });
        return;
      }
      Toast.show({
        position: "bottom",
        text1: "Sorry process failed",
        text2: error instanceof Error ? error.message : undefined,
        type: "error",
      });
    }
  };

  return (
    <SafeAreaWrapper>
      <View className="flex-1 bg-slate-50">
        <View className="pointer-events-none absolute -right-10 -top-24 h-44 w-44 rounded-full bg-primary opacity-10" />
        <View className="pointer-events-none absolute -bottom-28 -left-16 h-52 w-52 rounded-full bg-primary opacity-10" />
        <ContentWrapper>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 items-center justify-center py-6">
              <View className="mb-6 items-center">
                <PageTitle title="Register" />
                <Text className="mt-2 text-base text-slate-500">
                  Create your account to get started
                </Text>
              </View>
              <View className="w-full gap-y-4 rounded-3xl bg-white px-6 py-8 shadow-sm">
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  control={control}
                  name="name"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <NameInput
                      className="border-2 border-slate-200 py-5"
                      hasError={errors.name}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      defaultValue="Om Prakash Shah"
                      value={field.value}
                    />
                  )}
                />
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  control={control}
                  name="email"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UsernameInput
                      className="border-2 border-slate-200 py-5"
                      hasError={errors.email}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      defaultValue="om@prakash.com"
                      value={field.value}
                      placeholder="Your email/phone"
                    />
                  )}
                />
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
                      className="border-2 border-slate-200 py-5"
                      hasError={errors.password}
                      setShowPassword={setShowPassword}
                      showPassword={showPassword}
                      placeholder="Password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      defaultValue="password123"
                    />
                  )}
                />
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  control={control}
                  name="password_confirmation"
                  rules={{ required: true }}
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
                      className="border-2 border-slate-200 py-5"
                      hasError={errors.password_confirmation}
                      setShowPassword={setShowRepeatPassword}
                      showPassword={showRepeatPassword}
                      placeholder="Password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      defaultValue="password123"
                    />
                  )}
                />
                <FullWidthActionBtn
                  handleOnPress={handleSubmit(handleRegister)}
                  label={isSubmitting ? "Creating account..." : "Register"}
                  disabled={isSubmitting}
                />
                <View className="flex-row items-center justify-center gap-x-3">
                  <View className="h-px flex-1 bg-slate-200" />
                  <Text className="text-gray-400">or</Text>
                  <View className="h-px flex-1 bg-slate-200" />
                </View>
                <TouchableOpacity disabled={isSubmitting}>
                  <SocialLoginButton label="register with" provider="google" />
                </TouchableOpacity>
                <TouchableOpacity disabled={isSubmitting}>
                  <SocialLoginButton
                    label="register with"
                    provider="facebook"
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-6 flex-row items-center gap-x-2">
                <View>
                  <Text>Old User?</Text>
                </View>
                <Link href="/auth/login">
                  <Text className="text-primary underline">Sign In</Text>
                </Link>
              </View>
            </View>
          </ScrollView>
        </ContentWrapper>
      </View>
    </SafeAreaWrapper>
  );
}
