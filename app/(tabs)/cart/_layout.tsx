import { Stack } from "expo-router";
import { AuthGuard } from "@/modules/core/utils/authGuard";

const Home = () => {
  return (
    <AuthGuard requireAuth={true}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
        <Stack.Screen
          name="paymentScreen/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthGuard>
  );
};

export default Home;
