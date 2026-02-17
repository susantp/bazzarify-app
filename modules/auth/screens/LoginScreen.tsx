import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <View className="flex-1 bg-slate-50">
        <View className="pointer-events-none absolute -right-10 -top-24 h-44 w-44 rounded-full bg-primary opacity-10" />
        <View className="pointer-events-none absolute -bottom-28 -left-16 h-52 w-52 rounded-full bg-primary opacity-10" />
        <ContentWrapper>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 items-center justify-center py-6">
              <View className="mb-6 items-center">
                <PageTitle title="Login" />
                <Text className="mt-2 text-base text-slate-500">
                  Welcome back, sign in to continue
                </Text>
              </View>
              <View className="w-full gap-y-4 rounded-3xl bg-white px-6 py-8 shadow-sm">
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  control={control}
                  rules={{
                    required: "Email/Phone is required",
                  }}
                  name="email"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UsernameInput
                      className="border-2 border-slate-200 py-5"
                      hasError={errors.email}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      placeholder="Enter email/phone"
                    />
                  )}
                />
                <ControlledInput
                  className="w-full gap-y-2"
                  errors={errors}
                  control={control}
                  rules={{
                    required: "Password is required",
                  }}
                  name="password"
                  formField={({ field }: IControlledFormFieldProps) => (
                    <UserPasswordInput
                      className="border-2 border-slate-200 py-5 text-black"
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
                <View className="h-2" />
                <FullWidthActionBtn
                  handleOnPress={handleSubmit(handleCredentialsLogin)}
                  label={isSubmitting ? "Logging in..." : "Login"}
                  disabled={isSubmitting}
                />
                <View className="flex-row items-center justify-center gap-x-3">
                  <View className="h-px flex-1 bg-slate-200" />
                  <Text className="text-gray-400">or</Text>
                  <View className="h-px flex-1 bg-slate-200" />
                </View>
                <TouchableOpacity>
                  <SocialLoginButton
                    label="sign in with"
                    provider="google"
                    onPress={() => handleOAuthLogin(LoginProvider.GOOGLE)}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SocialLoginButton
                    label="sign in with"
                    provider="facebook"
                    onPress={() => handleOAuthLogin(LoginProvider.FACEBOOK)}
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-6 flex-row items-center gap-x-2">
                <View>
                  <Text>New User?</Text>
                </View>
                <Pressable onPress={() => router.push("/(guest)/register")}>
                  <Text className="text-primary underline">Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </ContentWrapper>
      </View>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
