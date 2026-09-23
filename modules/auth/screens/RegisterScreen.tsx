import { Pressable, ScrollView, StyleSheet } from "react-native";
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
import { Box, Text } from "@/components/design-system";

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
      const registration = await actionRegister(data);
      if (!("payload" in registration) || !registration.payload?.token) {
        throw new Error(
          "error" in registration
            ? String(registration.error)
            : "Registration token missing",
        );
      }
      const token = registration.payload.token;
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
      <Box flex={1} backgroundColor="surfaceMuted">
        <Box
          pointerEvents="none"
          backgroundColor="primary"
          style={styles.topGlow}
        />
        <Box
          pointerEvents="none"
          backgroundColor="primary"
          style={styles.bottomGlow}
        />
        <ContentWrapper>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box flex={1} align="center" justify="center" paddingY="xxl">
              <Box align="center" gap="sm" style={styles.titleBlock}>
                <PageTitle title="Register" />
                <Text variant="body" color="textMuted">
                  Create your account to get started
                </Text>
              </Box>
              <Box
                backgroundColor="surface"
                borderRadius="xl"
                gap="lg"
                paddingX="xxl"
                paddingY="xxl"
                style={styles.formCard}
              >
                <ControlledInput
                  style={{ width: "100%", gap: 8 }}
                  errors={errors}
                  control={control}
                  name="name"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <NameInput
                      hasError={errors.name}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      defaultValue="Om Prakash Shah"
                      value={field.value}
                    />
                  )}
                />
                <ControlledInput
                  style={{ width: "100%", gap: 8 }}
                  errors={errors}
                  control={control}
                  name="email"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UsernameInput
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
                  style={{ width: "100%", gap: 8 }}
                  errors={errors}
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
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
                  style={{ width: "100%", gap: 8 }}
                  errors={errors}
                  control={control}
                  name="password_confirmation"
                  rules={{ required: true }}
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
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
                <Box direction="row" align="center" justify="center" gap="md">
                  <Box flex={1} style={styles.divider} />
                  <Text color="textMuted">or</Text>
                  <Box flex={1} style={styles.divider} />
                </Box>
                <Pressable disabled={isSubmitting}>
                  <SocialLoginButton label="register with" provider="google" />
                </Pressable>
                <Pressable disabled={isSubmitting}>
                  <SocialLoginButton
                    label="register with"
                    provider="facebook"
                  />
                </Pressable>
              </Box>
              <Box
                direction="row"
                align="center"
                gap="sm"
                style={styles.signinRow}
              >
                <Text>Old User?</Text>
                <Link href="/auth/login">
                  <Text color="primary" style={styles.signinText}>
                    Sign In
                  </Text>
                </Link>
              </Box>
            </Box>
          </ScrollView>
        </ContentWrapper>
      </Box>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  bottomGlow: {
    borderRadius: 999,
    bottom: -112,
    height: 208,
    left: -64,
    opacity: 0.1,
    position: "absolute",
    width: 208,
  },
  divider: { backgroundColor: "#E2E8F0", height: StyleSheet.hairlineWidth },
  formCard: {
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    width: "100%",
  },
  signinRow: { marginTop: 24 },
  signinText: { textDecorationLine: "underline" },
  titleBlock: { marginBottom: 24 },
  topGlow: {
    borderRadius: 999,
    height: 176,
    opacity: 0.1,
    position: "absolute",
    right: -40,
    top: -96,
    width: 176,
  },
});
