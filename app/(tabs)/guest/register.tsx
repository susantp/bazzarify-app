import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React, { useState } from "react";
import PageTitle from "@/components/account/PageTitle";
import { Link, router } from "expo-router";
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
import { retrieveStorage } from "@/modules/core/utils/secureStore";
import { IApiResponse } from "@/modules/core/types";

const Page = () => {
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
  const handleRegister = async (data: TRegisterFormField) => {
    try {
      const response: IApiResponse<string | object> =
        await actionRegister(data);

      if (response.metaData.error) {
        setError("password_confirmation", {
          type: "manual",
          message: "Oops",
        });
        return;
      }
      const token = await retrieveStorage("token");
      if (token) {
        router.replace("/account/profile");
      }
    } catch (error) {
      setError("password_confirmation", {
        type: "manual",
        message: `Oops! Please contact bazzarify support.`,
      });
      Sentry.captureException(error);
    }
  };
  return (
    <SafeAreaWrapper>
      <ContentWrapper>
        <ScrollView>
          <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4">
            <PageTitle title="Register" />
            <View className="h-5" />
            <ControlledInput
              className="w-full gap-y-2 px-6"
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
              className="w-full gap-y-2 px-6"
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
              className="w-full gap-y-2 px-6"
              errors={errors}
              name={`password`}
              control={control}
              rules={{
                required: true,
              }}
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
                  defaultValue={`password123`}
                />
              )}
            />

            <ControlledInput
              className="w-full gap-y-2 px-6"
              errors={errors}
              control={control}
              name="password_confirmation"
              rules={{
                required: true,
              }}
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
                  defaultValue={`password123`}
                />
              )}
            />
            <FullWidthActionBtn
              handleOnPress={handleSubmit(handleRegister)}
              label={isSubmitting ? "Please wait..." : "Register"}
            />
            <Text className="text-gray-400">or</Text>
            <TouchableOpacity>
              <SocialLoginButton label="register with" provider="google" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SocialLoginButton label="register with" provider="facebook" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-x-2">
              <View>
                <Text>Old User?</Text>
              </View>
              <Link href="/guest/login">
                <Text className="text-orange-600 underline">Sign In</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
};

export default Page;
