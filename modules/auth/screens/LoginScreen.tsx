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
    formState: { errors },
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
      <ContentWrapper>
        <ScrollView>
          <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4">
            <PageTitle title="Login" />
            <View className="h-5" />
            <ControlledInput
              className="w-full gap-y-2 px-6"
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
              className="w-full gap-y-2 px-6"
              errors={errors}
              control={control}
              rules={{
                required: "Password is required",
              }}
              name="password"
              formField={({ field }: IControlledFormFieldProps) => (
                <UserPasswordInput
                  className="border-2 border-slate-200 py-5"
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
            <View className="h-4" />
            <FullWidthActionBtn
              handleOnPress={handleSubmit(handleCredentialsLogin)}
              label="Login"
            />
            <Text className="text-gray-400">or</Text>
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
            <View className="flex-row items-center gap-x-2">
              <View>
                <Text>New User?</Text>
              </View>
              <Pressable onPress={() => router.push("/guest/register")}>
                <Text className="text-orange-600 underline">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
