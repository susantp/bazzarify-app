import { ScrollView, View } from "react-native";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import React, { useState } from "react";
import PageTitle from "@/components/account/PageTitle";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useForm } from "react-hook-form";
import {
  IControlledFormFieldProps,
  TForgetPasswordVerificationFormField,
} from "@/components/common";
import ControlledInput from "@/components/common/ControlledInput";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { axiosInstance } from "@/modules/core/utils/axios";
import remotePaths from "@/staticData/remote.paths";
import { AxiosError, AxiosResponse } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import * as Sentry from "@sentry/react-native";
import NumberInput from "@/components/account/NumberInput";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  applyValidationFeedback,
  getValidationFeedback,
} from "@/modules/core/utils/validationFeedback";

export default function Page() {
  const { email, phone } = useLocalSearchParams<{
    email: string;
    phone: string;
  }>();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TForgetPasswordVerificationFormField>({
    defaultValues: {
      email: email,
      phone: phone,
      verification_code: undefined,
      password: "",
      password_confirmation: "",
    },
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const handleForgetPassword = async (
    data: TForgetPasswordVerificationFormField,
  ) => {
    axiosInstance
      .post(remotePaths.passwordReset.path, {
        ...data,
        phone: "+".concat(phone.trim()),
      })
      .then((response: AxiosResponse) => {
        if (response.data.metaData.error) {
          const feedback = getValidationFeedback(response.data.metaData.error);
          if (feedback) {
            applyValidationFeedback(setError, feedback);
            Toast.show({
              position: "bottom",
              text1: feedback.summary,
              type: "error",
            });
            return;
          }
          setError("phone", {
            type: "manual",
            message: response.data.metaData.error,
          });
          return;
        }
        router.replace("/(guest)/login");
      })
      .catch((error: AxiosError) => {
        console.log("password reset: ", error);
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
        setError("phone", {
          type: "manual",
          message: `Oops something went wrong. Please contact bazzarify support.. Please contact bazzarify support.`,
        });
      });
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Forget Password" />
      <ContentWrapper>
        <ScrollView>
          <View className="h-screen w-screen flex-col items-center justify-center gap-y-2">
            <PageTitle title="Forget Password" />
            <ControlledInput
              className="w-full gap-y-2 px-6"
              errors={errors}
              control={control}
              rules={{
                required: "Verification code is required",
                minLength: {
                  value: 6,
                  message: "Verification code must be 6 digits",
                },
              }}
              name="verification_code"
              formField={({ field }: IControlledFormFieldProps) => (
                <NumberInput
                  className="border-2 border-slate-200 py-5"
                  hasError={errors.verification_code}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  icon={
                    <FontAwesome
                      name="asterisk"
                      size={28}
                      strokeWidth={1}
                      color="gray"
                    />
                  }
                  placeholder="Enter OTP"
                />
              )}
            />
            <ControlledInput
              className="w-full gap-y-2 px-6"
              errors={errors}
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Password must be 8 digits" },
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
                required: "Confirm Password is required",
              }}
              formField={({ field }: IControlledFormFieldProps) => (
                <UserPasswordInput
                  className="border-2 border-slate-200 py-5"
                  hasError={errors.password_confirmation}
                  setShowPassword={setShowRepeatPassword}
                  showPassword={showRepeatPassword}
                  placeholder="Confirm Password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  defaultValue={`password123`}
                />
              )}
            />

            <FullWidthActionBtn
              handleOnPress={handleSubmit(handleForgetPassword)}
              label="Update password"
              disabled={isSubmitting}
            />
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
