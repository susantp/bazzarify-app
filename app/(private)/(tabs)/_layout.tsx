import { Stack } from "expo-router";

export default function PrivateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="cart/checkout" options={{ headerShown: false }} />
      <Stack.Screen name="cart/payment" options={{ headerShown: false }} />
      <Stack.Screen
        name="cart/paymentScreen/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
