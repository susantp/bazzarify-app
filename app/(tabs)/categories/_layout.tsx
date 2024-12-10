import { Stack } from "expo-router";

const Home = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/[child]/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]/[child]/[subChild]/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Home;
