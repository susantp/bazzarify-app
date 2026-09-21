import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/request-password-reset"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/verify-password-reset"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
