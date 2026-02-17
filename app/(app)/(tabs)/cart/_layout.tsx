import { Stack } from "expo-router";

const Home = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="paymentScreen/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Home;
