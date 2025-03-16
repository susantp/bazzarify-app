import { useRecoilValue } from "recoil";
import { userToken } from "@/atoms/sessionAtom";
import { Stack } from "expo-router";
import Page from "@/app/(tabs)/account/profile";

const Layout = () => {
  const token = useRecoilValue(userToken);
  if (token) {
    return <Page />;
  }

  return (
    <Stack>
      <Stack.Screen name="guestAccountIndex" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="request-password-reset"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verify-password-reset"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
