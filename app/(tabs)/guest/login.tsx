import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React, { useState } from "react";
import PageTitle from "@/components/account/PageTitle";
import { useRecoilState } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
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

const LoginScreen = () => {
  const [session, setSession] = useRecoilState(userSession);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormField>({
    defaultValues: {
      email: "abc@abc.com",
      password: "abc",
    },
  });
  const handleLogin = async (data: TLoginFormField) => {
    // axiosInstance
    //   .post("/auth/login/credentials", data)
    //   .then((response: AxiosResponse) => {
    //     console.log("response", response.data);
    //   })
    //   .catch((error: AxiosError) => {
    //     console.log("error: ", error.request);
    //   });
    setSession(!session);
    // router.push("/account/profile");
  };
  const [showPassword, setShowPassword] = useState(true);
  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4 bg-gray-100">
          <PageTitle title="Login" />
          <View className="h-5" />

          <ControlledInput
            className="w-full gap-y-2 px-6"
            errors={errors}
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            formField={({ field }: IControlledFormFieldProps) => (
              <UsernameInput
                className="py-3"
                hasError={errors.username}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
            )}
          />
          <ControlledInput
            className="w-full gap-y-2 px-6"
            errors={errors}
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            formField={({ field }: IControlledFormFieldProps) => (
              <UserPasswordInput
                className="py-3"
                hasError={errors.password}
                setShowPassword={setShowPassword}
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
            handleOnPress={handleSubmit(handleLogin)}
            label="Login"
          />
          <Text className="text-gray-400">or</Text>
          <TouchableOpacity>
            <SocialLoginButton label="sign in with" provider="google" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SocialLoginButton label="sign in with" provider="facebook" />
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
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
