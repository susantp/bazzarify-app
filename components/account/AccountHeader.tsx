import { TouchableOpacity, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AccountHeader = () => {
  return (
    <View className="flex-row items-center justify-between bg-primary">
      <ScreenHeader
        title="Account"
        style={{ width: "50%" }}
        interactive={false}
      />
      <TouchableOpacity
        className="w-6/12 items-end px-4"
        activeOpacity={0.4}
        onPress={() => {
          router.push({ pathname: "/account/setting" });
        }}
      >
        <Ionicons name="settings-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AccountHeader;
