import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import { Pressable, StyleSheet } from "react-native";
import PolygonButton from "@/components/common/PolygonButton";
import { useState } from "react";
import { router } from "expo-router";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Box, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

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
  const theme = useBazarifyTheme();
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
      <ContentWrapper styles={styles.content}>
        <Box id="auth-actions" align="center" gap="lg">
          <Text variant="title" align="center">
            Login or Register to get special offers.
          </Text>
          <Box direction="row" align="center">
            <PolygonButton
              dimensions={loginBtnDimension}
              setDimensions={setLoginBtnDimension}
              onPress={handleLoginPress}
              color={theme.colors.text}
              label="Login"
              style={{ paddingVertical: 10 }}
              isLeft={true}
            />
            <PolygonButton
              dimensions={registerBtnDimension}
              setDimensions={setRegisterBtnDimension}
              onPress={handleRegisterPress}
              color={theme.colors.primary}
              label="Register"
              style={{ paddingVertical: 10 }}
              isLeft={false}
            />
          </Box>
        </Box>
        <Box
          id="guest-menu"
          style={[styles.menu, { borderTopColor: theme.colors.borderStrong }]}
        >
          {Object.keys(guestMenu).map((key: string) => (
            <Pressable
              accessibilityLabel={guestMenu[key].label}
              accessibilityRole="button"
              key={key}
              style={({ pressed }) => [
                styles.menuItem,
                { borderBottomColor: theme.colors.borderStrong },
                pressed && styles.pressed,
              ]}
            >
              <Text>{guestMenu[key].label}</Text>
            </Pressable>
          ))}
        </Box>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  content: { gap: 36, paddingVertical: 20 },
  menu: { borderTopWidth: StyleSheet.hairlineWidth },
  menuItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  pressed: { opacity: 0.6 },
});
