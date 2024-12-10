import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserPasswordInput from "@/components/account/UserPasswordInput";
import SocialLoginButton from "@/components/account/SocialLoginButton";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PageTitle from "@/components/account/PageTitle";
import { useRecoilState } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Link } from "expo-router";
import FullNameInput from "@/components/account/FullNameInput";
import UsernameInput from "@/components/account/UsernameInput";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";

const RegisterScreen = () => {
  const ios: boolean = Platform.OS === "ios";
  const inputPadding: string = ios ? "py-5" : "py-4";
  const [session, setSession] = useRecoilState(userSession);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View className="h-screen-safe w-screen flex-col items-center justify-center gap-y-4 bg-gray-100">
            <PageTitle title="Register" />
            <View className="h-5" />
            <FullNameInput
              inputPadding={inputPadding}
              defaultValue={`Om Prakash Shah`}
            />
            <UsernameInput
              inputPadding={inputPadding}
              defaultValue={`om.prakash@gmail.com`}
            />
            <UserPasswordInput
              placeholder="Password"
              inputPadding={inputPadding}
              defaultValue={`password123`}
            />
            <UserPasswordInput
              placeholder="Confirm Password"
              inputPadding={inputPadding}
              defaultValue={`password123`}
            />
            <FullWidthActionBtn
              handleOnPress={() => setSession(!session)}
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
              <Link href="/auth/login">
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
