import { TouchableOpacity, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

const AccountHeader = () => {
  return (
    <View className="flex-row items-center justify-between bg-primary">
      <ScreenHeader
        title="Account"
        containerClassname="w-6/12"
        interactive={false}
      />
      <TouchableOpacity
        className="w-6/12 items-end px-4"
        activeOpacity={0.4}
        onPress={() => {
          router.push({ pathname: "/account/setting" });
        }}
      >
        <Cog6ToothIcon size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AccountHeader;
