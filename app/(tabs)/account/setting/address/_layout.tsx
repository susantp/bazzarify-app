import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ headerShown: false }} />
      <Stack.Screen name="edit/[uuid]" options={{ headerShown: false }} />
    </Stack>
  );
}
