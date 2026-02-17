import { Stack } from "expo-router";

const Home = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[query]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Home;
