import { useRecoilValue } from "recoil";
import { userSession } from "@/atoms/sessionAtom";
import { Stack } from "expo-router";
import Profile from "@/app/(tabs)/account/profile";

const Home = () => {
  const session = useRecoilValue(userSession);
  if (session) return <Profile />;

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Home;
