import { Pressable, StyleSheet } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon } from "@/components/design-system";

const AccountHeader = () => {
  return (
    <Box
      direction="row"
      align="center"
      justify="space-between"
      backgroundColor="primary"
    >
      <ScreenHeader title="Account" style={styles.title} interactive={false} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Account settings"
        style={styles.settings}
        onPress={() => {
          router.push({ pathname: "/account/setting" });
        }}
      >
        <Icon size={32} color="textInverted">
          {({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
        </Icon>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: { width: "50%" },
  settings: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    width: "50%",
  },
});

export default AccountHeader;
