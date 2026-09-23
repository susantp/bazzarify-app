import { Pressable, ScrollView, StyleSheet } from "react-native";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React from "react";
import PageTitle from "@/components/account/PageTitle";
import LoginFormHelperText from "@/components/account/LoginFormHelperText";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useForm } from "react-hook-form";
import UsernameInput from "@/components/account/UsernameInput";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import {
  IControlledFormFieldProps,
  TLoginFormField,
} from "@/components/common";
import ControlledInput from "@/components/common/ControlledInput";
import { router } from "expo-router";
import ContentWrapper from "@/components/common/ContentWrapper";
import LoginProvider from "@/modules/auth/enums/loginProvider";
import useLoginHook from "@/modules/auth/hooks/useLoginHook";
import { Box, Text } from "@/components/design-system";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormField>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    showPassword,
    handleOAuthLogin,
    handleCredentialsLogin,
    handleShowPassword,
  } = useLoginHook();
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
                <PageTitle title="Login" />
                <Text variant="body" color="textMuted">
                  Welcome back, sign in to continue
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
                  rules={{
                    required: "Email/Phone is required",
                  }}
                  name="email"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UsernameInput
                      hasError={errors.email}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      placeholder="Enter email/phone"
                    />
                  )}
                />
                <ControlledInput
                  style={{ width: "100%", gap: 8 }}
                  errors={errors}
                  control={control}
                  rules={{
                    required: "Password is required",
                  }}
                  name="password"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
                      hasError={errors.password}
                      setShowPassword={handleShowPassword}
                      showPassword={showPassword}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  )}
                />

                <LoginFormHelperText />
                <Box style={styles.smallSpacer} />
                <FullWidthActionBtn
                  handleOnPress={handleSubmit(handleCredentialsLogin)}
                  label={isSubmitting ? "Logging in..." : "Login"}
                  disabled={isSubmitting}
                />
                <Box direction="row" align="center" justify="center" gap="md">
                  <Box flex={1} style={styles.divider} />
                  <Text color="textMuted">or</Text>
                  <Box flex={1} style={styles.divider} />
                </Box>
                <SocialLoginButton
                  label="sign in with"
                  provider="google"
                  onPress={() => handleOAuthLogin(LoginProvider.GOOGLE)}
                />
                <SocialLoginButton
                  label="sign in with"
                  provider="facebook"
                  onPress={() => handleOAuthLogin(LoginProvider.FACEBOOK)}
                />
              </Box>
              <Box
                direction="row"
                align="center"
                gap="sm"
                style={styles.signupRow}
              >
                <Text>New User?</Text>
                <Pressable onPress={() => router.push("/auth/register")}>
                  <Text color="primary" style={styles.signupText}>
                    Sign Up
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </ScrollView>
        </ContentWrapper>
      </Box>
    </SafeAreaWrapper>
  );
};

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
  signupRow: { marginTop: 24 },
  signupText: { textDecorationLine: "underline" },
  smallSpacer: { height: 8 },
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

export default LoginScreen;
