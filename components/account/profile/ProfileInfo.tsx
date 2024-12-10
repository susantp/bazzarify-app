import { Image, Text, TouchableOpacity, View } from "react-native";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { UserEditIcon } from "@/components/common/icons";
import { Colors } from "@/constants/Colors";

const ProfileInfo = () => (
  <View className="w-screen flex-row items-center gap-x-1 py-4">
    <View className="w-4/12 items-center justify-items-center">
      <Image
        source={require("@/assets/images/profile.png")}
        className="h-32 w-32"
      />
    </View>
    <View className="w-4/12 flex-col gap-y-2">
      <Text className="text-md font-semibold">Om Prakash Shah</Text>
      <View className="flex-row items-center gap-x-1 rounded-full py-0.5">
        <CheckBadgeIcon size={20} color={Colors.light.tint} />
        <Text className="text-sm">Verified</Text>
      </View>
      <Text className="text-sm">0 WishList </Text>
      <Text className="text-sm">2 Stores Followed </Text>
    </View>
    <View className="flex w-3/12 items-end">
      <TouchableOpacity>
        <UserEditIcon />
      </TouchableOpacity>
    </View>
  </View>
);

export default ProfileInfo;
