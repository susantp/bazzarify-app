import { useRecoilValue } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Stack } from "expo-router";
import Page from "@/app/(tabs)/guest/guestAccountIndex";

const Layout = () => {
  const session = useRecoilValue(userSession);
  if (!session) return <Page />;
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      <Stack.Screen name="setting/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="setting/address/[id]/edit"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="setting/address/create"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="setting/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="order/index" options={{ headerShown: false }} />
      <Stack.Screen name="order/[status]" options={{ headerShown: false }} />
      <Stack.Screen name="voucherCenter" options={{ headerShown: false }} />
      <Stack.Screen name="message/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="message/activities"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="message/promotions"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
