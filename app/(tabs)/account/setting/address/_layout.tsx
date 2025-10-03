import { Stack } from "expo-router";
import { AuthGuard } from "@/modules/core/utils/authGuard";

export default function Layout() {
  return (
    <AuthGuard requireAuth={true}>
      <Stack>
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen name="edit/[uuid]" options={{ headerShown: false }} />
      </Stack>
    </AuthGuard>
  );
}
