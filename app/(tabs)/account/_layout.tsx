import { useRecoilValue } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Stack } from "expo-router";
import LoginScreen from "@/app/(tabs)/auth/login";

const Home = () => {
  const session = useRecoilValue(userSession);
  if (!session) return <LoginScreen />;
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="setting/index" options={{ headerShown: false }} />
      <Stack.Screen name="setting/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="order/index" options={{ headerShown: false }} />
      <Stack.Screen name="order/tracking" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Home;
