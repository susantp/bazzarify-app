import { useRecoilValue } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import Page from "@/app/(tabs)/account/profile";
import { Stack } from "expo-router";

const Layout = () => {
  const session = useRecoilValue(userSession);
  if (session) return <Page />;
  return (
    <Stack>
      <Stack.Screen name="guestAccountIndex" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
