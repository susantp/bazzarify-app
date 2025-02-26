import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PageTitle from "@/components/account/PageTitle";
import { useRecoilState } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Link } from "expo-router";
import UsernameInput from "@/components/account/UsernameInput";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/common/ControlledInput";
import {
  IControlledFormFieldProps,
  TRegisterFormField,
} from "@/components/common";

const RegisterScreen = () => {
  const [session, setSession] = useRecoilState(userSession);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormField>({
    defaultValues: {
      username: "abc@abc.com",
      password: "abc",
    },
  });
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const handleRegister = async () => {
    setSession(!session);
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
              name="username"
              formField={({ field }: IControlledFormFieldProps) => (
                <UsernameInput
                  className="py-3"
                  hasError={errors.username}
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
              name="repeat-password"
              rules={{
                required: true,
              }}
              formField={({ field }: IControlledFormFieldProps) => (
                <UserPasswordInput
                  className="py-3"
                  hasError={errors.repeatPassword}
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
              label="Register"
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

export default RegisterScreen;
