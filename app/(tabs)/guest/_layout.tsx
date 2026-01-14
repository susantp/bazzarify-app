import { Stack } from "expo-router";
import { AuthGuard } from "@/modules/core/utils/authGuard";

const Layout = () => {
  return (
    <AuthGuard requireAuth={false} basePath="/guest">
      <Stack>
        <Stack.Screen
          name="guestAccountIndex"
          options={{ headerShown: false }}
        />
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
    </AuthGuard>
  );
};

export default Layout;
