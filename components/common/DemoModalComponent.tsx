import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: showModal ? "rgba(0,0,0,0.4)" : "transparent",
          }}
          onPress={handlePress}
        />

        {/* Modal content (separate layer) */}
        {type === "bottom" && (
          <BottomDrawerContainer handlePress={handlePress}>
            {children}
          </BottomDrawerContainer>
        )}

        {type === "center" && (
          <CenterContainer handlePress={handlePress}>
            {children}
          </CenterContainer>
        )}
      </View>
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
  return (
    <SafeAreaView
      edges={["bottom"]} // 🔥 THIS is the fix
      className="absolute bottom-0 w-full border-t border-t-gray-400 bg-white"
      style={{
        maxHeight: SCREEN_HEIGHT * 0.85,
      }}
    >
      {/* Close button */}
      <View className="p-6 pb-2">
        <TouchableOpacity className="items-end" onPress={handlePress}>
          <AntDesign name="close-circle" size={28} color={primaryColor} />
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <View style={{ flex: 1, paddingHorizontal: 24 }}>{children}</View>
    </SafeAreaView>
  );
};

const CenterContainer = ({
  children,
  height,
  handlePress,
}: IModalContentContainerProps) => (
  <View className={`absolute w-full flex-col gap-y-2 bg-transparent p-6`}>
    {children}
    <TouchableOpacity className="w-full items-center" onPress={handlePress}>
      <AntDesign name="close-circle" color="white" size={35} strokeWidth={4} />
    </TouchableOpacity>
  </View>
);
