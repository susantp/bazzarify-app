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
import { router } from "expo-router";
import LoginFormHelperText from "@/components/account/LoginFormHelperText";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Controller, useForm } from "react-hook-form";
import UsernameInput from "@/components/account/UsernameInput";
import UserPasswordInput from "@/components/account/UserPasswordInput";

type FormData = {
  username: string;
  password: string;
};
const LoginScreen = () => {
  const [session, setSession] = useRecoilState(userSession);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = async () => {
    // await axios
    //   .get("https://127.0.0.1/health")
    //   .then((res) => console.log(res))
    //   .catch((err: AxiosError) => console.log("error:", err.message));
    // await fetch(
    //   "https://local-ne.techbizz.local/api/v1/auth/login/credentials",
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       username: "vendor@gmail.com",
    //       password: "admin",
    //     }),
    //   },
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error: Error) => {
    //     console.log("error: ", error.message);
    //   });
    setSession(!session);
    router.push("/account/profile");
  };
  const [showPassword, setShowPassword] = useState(true);
  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4 bg-gray-100">
          <PageTitle title="Login" />
          <View className="h-5" />

          <View className="w-full flex-col gap-y-2 px-6">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <UsernameInput
                  hasError={errors.username}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="username"
            />
          </View>
          <View className="w-full flex-col gap-y-2 px-6">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <UserPasswordInput
                  hasError={errors.password}
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
              name="password"
            />
          </View>

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
            <Pressable onPress={() => console.log("register press")}>
              <Text className="text-orange-600 underline">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
