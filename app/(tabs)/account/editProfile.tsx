import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/atoms/sessionAtom";
import Toast from "react-native-toast-message";

export default function Page() {
  const { width } = useWindowDimensions();
  const userProfile = useRecoilValue(userProfileAtom);
  const handleProfileUpdate = () => {
    Toast.show({
      position: "bottom",
      text1: "Done",
      type: "success",
    });
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Edit Profile" />
      <ScrollView className="flex-1 bg-white">
        <ContentWrapper className="items-center gap-y-4 px-4 py-3.5">
          <View>
            <Image
              source={require("@/assets/images/profile.png")}
              style={{ width: 100, height: 100 }}
            />
            <View className="absolute bottom-0 right-0">
              <AntDesign
                name="pluscircle"
                size={24}
                color={Colors.light.tint}
              />
            </View>
          </View>
          <TextInputV1
            style={{ width: width * 0.95 }}
            defaultValue={userProfile.name}
            placeholder={"Enter Your Profile"}
          />
          <TextInputV1
            style={{ width: width * 0.95 }}
            defaultValue={userProfile.displayName}
            placeholder={"Display name (opt)"}
          />
          <TextInputV1
            keyboardType={"numeric"}
            style={{ width: width * 0.95 }}
            defaultValue={userProfile.phoneNumber}
            placeholder={"phone"}
          />
          <TextInputV1
            keyboardType={"email-address"}
            style={{ width: width * 0.95 }}
            defaultValue={userProfile.email}
            placeholder={"email"}
          />
          <TextInputV1
            style={{ width: width * 0.95 }}
            defaultValue={userProfile.dob}
            placeholder={"dob"}
          />
          <View className="w-full items-start pt-3">
            <Text className="text-lg font-semibold">Update Password</Text>
          </View>

          <TextInputV1
            keyboardType="visible-password"
            style={{ width: width * 0.95 }}
            placeholder={"Current Password"}
          />
          <TextInputV1
            keyboardType="visible-password"
            style={{ width: width * 0.95 }}
            placeholder={"New Password"}
          />
          <TextInputV1
            keyboardType="visible-password"
            style={{ width: width * 0.95 }}
            placeholder={"Confirm Password"}
          />
          <TouchableOpacity
            onPress={handleProfileUpdate}
            activeOpacity={0.6}
            className="flex w-full items-center rounded-xl bg-orange-600 py-3"
          >
            <Text className="text-lg text-white">Update</Text>
          </TouchableOpacity>
        </ContentWrapper>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const TextInputV1 = (props: TextInputProps) => {
  return (
    <TextInput
      className="space-x-3 rounded-xl border border-slate-300 bg-white py-3.5"
      {...props}
    />
  );
};
