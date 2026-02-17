import { Stack } from "expo-router";

const Home = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[child]/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[child]/[subchild]/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[child]/[subchild]/[grandchild]/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="popular" options={{ headerShown: false }} />
      <Stack.Screen name="flashDeal" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Home;
