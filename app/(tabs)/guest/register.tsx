import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PageTitle from "@/components/account/PageTitle";
import { useRecoilState } from "recoil";
import { userToken } from "@/atoms/sessionAtom";
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
import authRemotePaths from "@/staticData/remote.paths";
import axiosInstance from "@/utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { save } from "@/utils/secureStore";

const Page = () => {
  const [token, setToken] = useRecoilState(userToken);
  const [formValues] = useState({
    name: "om prakash shah",
    email: "abwtccbecd@abc.com",
    password: "Handsome123",
    password_confirmation: "Handsome123",
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
    axiosInstance
      .post(authRemotePaths.registerCredentials.path, data)
      .then((response: AxiosResponse) => {
        if (response.data.metaData.errorCode) {
          setError("password_confirmation", {
            type: "manual",
            message: response.data.metaData.error,
          });
        }
        const token = response.data.metaData.token;
        save("token", token);
        setToken(response.data.data.payload.token);
        router.replace("/account/profile");
        console.log("user registered replacing to profile screen");
      })
      .catch((error: AxiosError) => {
        setError("password_confirmation", {
          type: "manual",
          message: "System Error. Please Contact us.",
        });
        console.log("error: ", error);
      });
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4 bg-gray-100">
            <PageTitle title="Register" />
            <View className="h-5" />
            <ControlledInput
              className="w-full gap-y-2 px-6"
              errors={errors}
              control={control}
              name="name"
              formField={({ field }: IControlledFormFieldProps) => (
                <NameInput
                  className="py-3"
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
                  className="py-3"
                  hasError={errors.email}
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
              name={`password`}
              control={control}
              rules={{
                required: true,
              }}
              formField={({ field }: IControlledFormFieldProps) => (
                <UserPasswordInput
                  className="py-3"
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
                  className="py-3"
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;
