import { ScrollView } from "react-native";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import React from "react";
import PageTitle from "@/components/account/PageTitle";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { useForm } from "react-hook-form";
import UsernameInput from "@/components/account/UsernameInput";
import {
  IControlledFormFieldProps,
  TForgetPasswordFormField,
} from "@/components/common";
import ControlledInput from "@/components/common/ControlledInput";
import ContentWrapper from "@/components/common/ContentWrapper";
import NumberInput from "@/components/account/NumberInput";
import ScreenHeader from "@/components/common/ScreenHeader";
import { axiosInstance } from "@/modules/core/utils/axios";
import remotePaths from "@/staticData/remote.paths";
import { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import * as Sentry from "@sentry/react-native";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  applyValidationFeedback,
  getValidationFeedback,
} from "@/modules/core/utils/validationFeedback";
import { Box } from "@/components/design-system";

export default function RequestPasswordResetScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TForgetPasswordFormField>({
    defaultValues: {
      email: "gracysusant@gmail.com",
      phone: "+977",
    },
  });

  const handleForgetPassword = async (data: TForgetPasswordFormField) => {
    axiosInstance
      .post(remotePaths.passwordResetRequest.path, data)
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
        router.replace(
          `/auth/verify-password-reset?email=${data.email}&phone=${data.phone}`,
        );
      })
      .catch((error: AxiosError) => {
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
          message:
            "Oops something went wrong. Please contact bazzarify support.",
        });
      });
  };

  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Forget Password" />
      <ContentWrapper>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box flex={1} align="center" justify="center" gap="lg">
            <PageTitle title="Forget Password" />
            <ControlledInput
              style={{ width: "100%", gap: 8, paddingHorizontal: 24 }}
              errors={errors}
              control={control}
              rules={{ required: "Email is required" }}
              name="email"
              formField={({ field }: IControlledFormFieldProps) => (
                <UsernameInput
                  placeholder="Enter email"
                  hasError={errors.email}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                />
              )}
            />
            <ControlledInput
              style={{ width: "100%", gap: 8, paddingHorizontal: 24 }}
              errors={errors}
              control={control}
              rules={{ required: "Phone is required" }}
              name="phone"
              formField={({ field }: IControlledFormFieldProps) => (
                <NumberInput
                  hasError={errors.phone}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  placeholder="Enter your phone number"
                  icon={
                    <Feather
                      name="phone"
                      size={28}
                      strokeWidth={1}
                      color="gray"
                    />
                  }
                />
              )}
            />
            <FullWidthActionBtn
              handleOnPress={handleSubmit(handleForgetPassword)}
              label="Send OTP Code"
              disabled={isSubmitting}
            />
          </Box>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
