import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Text, TouchableOpacity, View } from "react-native";
import PolygonButton from "@/components/common/PolygonButton";
import { useState } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import ContentWrapper from "@/components/common/ContentWrapper";

type GuestMenuType = {
  [key: string]: { id: string; label: string };
};

const guestMenu: GuestMenuType = {
  message: { id: "message", label: "Message" },
  orders: { id: "orders", label: "Orders" },
  vouchers: { id: "vouchers", label: "Vouchers" },
  wishList: { id: "wishList", label: "Wish List" },
  support: { id: "support", label: "Bazzarify Support" },
};

export default function GuestAccountLandingScreen() {
  const [loginBtnDimension, setLoginBtnDimension] = useState({
    width: 0,
    height: 0,
  });
  const [registerBtnDimension, setRegisterBtnDimension] = useState({
    width: 0,
    height: 0,
  });

  const handleLoginPress = () => router.push("/auth/login");
  const handleRegisterPress = () => router.push("/auth/register");

  return (
    <SafeAreaWrapper>
      <ContentWrapper className="flex-col gap-y-9 py-5">
        <View id="auth-actions" className="flex-col items-center gap-y-4">
          <Text className="text-lg font-semibold">
            Login or Register to get special offers.
          </Text>
          <View className="flex-row items-center">
            <PolygonButton
              dimensions={loginBtnDimension}
              setDimensions={setLoginBtnDimension}
              onPress={handleLoginPress}
              color="#1A202C"
              label="Login"
              className="py-2.5"
              isLeft={true}
            />
            <PolygonButton
              dimensions={registerBtnDimension}
              setDimensions={setRegisterBtnDimension}
              onPress={handleRegisterPress}
              color={Colors.light.tint}
              label="Register"
              className="py-2.5"
              isLeft={false}
            />
          </View>
        </View>
        <View id="guest-menu" className="flex-col border-t border-t-slate-300">
          {Object.keys(guestMenu).map((key: string) => (
            <TouchableOpacity
              activeOpacity={0.4}
              className="border-b border-b-slate-300 px-3 py-6"
              key={key}
            >
              <Text>{guestMenu[key].label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
