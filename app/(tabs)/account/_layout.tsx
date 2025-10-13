import { Stack } from "expo-router";
import { AuthGuard } from "@/modules/core/utils/authGuard";

const Layout = () => {
  return (
    <AuthGuard requireAuth={true}>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
        <Stack.Screen name="order/index" options={{ headerShown: false }} />
        <Stack.Screen name="order/[status]" options={{ headerShown: false }} />
        <Stack.Screen
          name="order/[id]/return"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="voucherCenter" options={{ headerShown: false }} />
        <Stack.Screen name="message/index" options={{ headerShown: false }} />
        <Stack.Screen name="message/inbox" options={{ headerShown: false }} />
        <Stack.Screen
          name="message/activities"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="message/promotions"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthGuard>
  );
};

export default Layout;
