import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UsernameInput from "@/components/account/UsernameInput";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React from "react";
import PageTitle from "@/components/account/PageTitle";
import { useRecoilState } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Link } from "expo-router";
import LoginFormHelperText from "@/components/account/LoginFormHelperText";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";

const LoginScreen = () => {
  const ios: boolean = Platform.OS === "ios";
  const inputPadding: string = ios ? "py-5" : "py-4";
  const [session, setSession] = useRecoilState(userSession);
  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4 bg-gray-100">
          <PageTitle title="Login" />
          <View className="h-5" />
          <UsernameInput
            inputPadding={inputPadding}
            defaultValue={`om.prakash@gmail.com`}
          />
          <UserPasswordInput
            placeholder="Password"
            inputPadding={inputPadding}
            defaultValue={`password123`}
          />
          <LoginFormHelperText />
          <View className="h-4" />
          <FullWidthActionBtn
            handleOnPress={() => setSession(!session)}
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
            <Link href="/auth/register">
              <Text className="text-orange-600 underline">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
