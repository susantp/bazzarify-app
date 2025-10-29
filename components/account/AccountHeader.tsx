import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Cog6ToothIcon } from "react-native-heroicons/outline";

const AccountHeader = () => {
  return (
    <View className="flex-row items-center justify-between">
      <ScreenHeader title="Account" />
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => router.push({ pathname: "/account/setting" })}
      >
        <Cog6ToothIcon size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AccountHeader;
