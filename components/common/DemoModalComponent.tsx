import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Box, Icon } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";
import { SafeAreaView } from "react-native-safe-area-context";

interface IDemoModalComponent {
  children?: React.ReactNode;
  showModal: boolean;
  handlePress: (event: GestureResponderEvent) => void;
  type: TModalComponentType;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
type TModalComponentType = "bottom" | "center";
const DemoModalComponent = ({
  children,
  showModal,
  handlePress,
  type,
}: IDemoModalComponent) => {
  const theme = useBazarifyTheme();

  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <Box flex={1}>
        {/* Backdrop */}
        <Pressable
          accessibilityLabel="Close modal"
          style={[
            styles.backdrop,
            {
              backgroundColor: showModal ? theme.colors.overlay : "transparent",
            },
          ]}
          onPress={handlePress}
        />

        {/* Modal content (separate layer) */}
        {type === "bottom" && (
          <BottomDrawerContainer handlePress={handlePress}>
            {children}
          </BottomDrawerContainer>
        )}

        {type === "center" && (
          <CenterContainer
            handlePress={handlePress}
            themeColor={theme.colors.primary}
          >
            {children}
          </CenterContainer>
        )}
      </Box>
    </Modal>
  );
};

export default DemoModalComponent;

interface IModalContentContainerProps {
  children?: React.ReactNode;
  handlePress: (event: GestureResponderEvent) => void;
  height?: number;
}

const BottomDrawerContainer = ({
  children,
  handlePress,
}: IModalContentContainerProps) => {
  const theme = useBazarifyTheme();

  return (
    <SafeAreaView
      edges={["bottom"]} // 🔥 THIS is the fix
      style={[
        styles.bottomDrawer,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.borderStrong,
        },
      ]}
    >
      {/* Close button */}
      <Box paddingX="xxl" paddingY="sm" style={styles.closeRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close modal"
          onPress={handlePress}
        >
          <Icon size={28} color="primary" accessibilityLabel="Close modal">
            {({ color, size }) => (
              <AntDesign name="close-circle" size={size} color={color} />
            )}
          </Icon>
        </Pressable>
      </Box>

      {/* Scrollable content */}
      <Box flex={1} paddingX="xxl">
        {children}
      </Box>
    </SafeAreaView>
  );
};

const CenterContainer = ({
  children,
  height,
  handlePress,
  themeColor,
}: IModalContentContainerProps & { themeColor: string }) => (
  <Box style={styles.centerContainer} gap="sm" padding="lg">
    {children}
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close modal"
      onPress={handlePress}
      style={styles.centerClose}
    >
      <AntDesign name="close-circle" color={themeColor} size={35} />
    </Pressable>
  </Box>
);

const styles = StyleSheet.create({
  backdrop: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  bottomDrawer: {
    borderTopWidth: 1,
    bottom: 0,
    maxHeight: SCREEN_HEIGHT * 0.85,
    position: "absolute",
    width: "100%",
  },
  closeRow: { alignItems: "flex-end", paddingBottom: 8 },
  centerContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
  },
  centerClose: { alignItems: "center", width: "100%" },
});
