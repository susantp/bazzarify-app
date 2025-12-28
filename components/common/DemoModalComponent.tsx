import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";

interface IDemoModalComponent {
  children?: React.ReactNode;
  showModal: boolean;
  handlePress: (event: GestureResponderEvent) => void;
  type: TModalComponentType;
}

type TModalComponentType = "bottom" | "center";
const DemoModalComponent = ({
  children,
  showModal,
  handlePress,
  type,
}: IDemoModalComponent) => {
  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <TouchableOpacity
        activeOpacity={1}
        className="h-full"
        id="backdrop"
        style={{
          backgroundColor: showModal ? `rgba(0, 0, 0, 0.40)` : "transparent",
        }}
      >
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
      </TouchableOpacity>
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
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const bottomNavBarHeight =
    screenHeight - windowHeight - (StatusBar.currentHeight ?? 0);
  return (
    <View
      className={`absolute z-30 w-full flex-col gap-y-2 border-t border-t-gray-400 bg-white p-6`}
      style={{
        bottom: bottomNavBarHeight,
      }}
    >
      <TouchableOpacity className="w-full items-end" onPress={handlePress}>
        <AntDesign
          name="close-circle"
          color={primaryColor}
          size={28}
          strokeWidth={2}
        />
      </TouchableOpacity>
      {children}
    </View>
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
