import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/atoms/sessionAtom";
import Toast from "react-native-toast-message";
import TextInputV1 from "@/components/common/TextInputV1";

export default function Page() {
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
        <ContentWrapper className="gap-y-4 px-4 py-3.5">
          <View className="flex items-center">
            <View>
              <Image
                source={require("@/assets/images/profile.png")}
                style={{ width: 150, height: 150 }}
              />
              <TouchableOpacity
                activeOpacity={0.4}
                className="absolute bottom-2 right-2"
              >
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={Colors.light.tint}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TextInputV1
            defaultValue={userProfile.name}
            placeholder={"Enter Your Profile"}
          />
          <TextInputV1
            defaultValue={userProfile.displayName}
            placeholder={"Display name (opt)"}
          />
          <TextInputV1
            keyboardType={"numeric"}
            defaultValue={userProfile.phoneNumber}
            placeholder={"phone"}
          />
          <TextInputV1
            keyboardType={"email-address"}
            defaultValue={userProfile.email}
            placeholder={"email"}
          />
          <TextInputV1 defaultValue={userProfile.dob} placeholder={"dob"} />
          <View className="w-full items-start pt-3">
            <Text className="text-lg font-semibold">Update Password</Text>
          </View>

          <TextInputV1
            keyboardType="visible-password"
            placeholder={"Current Password"}
          />
          <TextInputV1
            keyboardType="visible-password"
            placeholder={"New Password"}
          />
          <TextInputV1
            keyboardType="visible-password"
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
