import { Pressable, ScrollView } from "react-native";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { AntDesign } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import { userProfileAtom } from "@/atoms/sessionAtom";
import Toast from "react-native-toast-message";
import TextInputV1 from "@/components/common/TextInputV1";
import { Box, Button, Icon, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

export default function Page() {
  const theme = useBazarifyTheme();
  const userProfile = useAtomValue(userProfileAtom);
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
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Box gap="lg" paddingX="lg" paddingY="lg">
          <Box align="center">
            <Box style={{ position: "relative" }}>
              <Image
                source={require("@/assets/images/profile.png")}
                size={150}
                radius="none"
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add profile image"
                style={{ position: "absolute", bottom: 8, right: 8 }}
              >
                <Icon color="primary" size={24}>
                  {({ color, size }) => (
                    <AntDesign name="plus-circle" size={size} color={color} />
                  )}
                </Icon>
              </Pressable>
            </Box>
          </Box>
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
          <Box align="flex-start" paddingY="sm">
            <Text variant="title">Update Password</Text>
          </Box>

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
          <Button
            label="Update"
            onPress={handleProfileUpdate}
            style={{ width: "100%", borderRadius: 20 }}
          />
        </Box>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
