import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface IDemoModalComponent {
  children?: React.ReactNode;
  showModal: boolean;
  handlePress: (event: GestureResponderEvent) => void;
  height?: number;
  type: TModalComponentType;
}

type TModalComponentType = "bottom" | "center";
const DemoModalComponent = ({
  children,
  showModal,
  handlePress,
  height,
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
          <BottomDrawerContainer height={height} handlePress={handlePress}>
            {children}
          </BottomDrawerContainer>
        )}
        {type === "center" && (
          <CenterContainer height={height} handlePress={handlePress}>
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
  height,
  handlePress,
}: IModalContentContainerProps) => (
  <View
    className={`absolute bottom-0 z-30 w-full flex-col gap-y-2 border-t border-t-gray-400 bg-white p-6`}
    style={{ height: height ? height : undefined }}
  >
    <TouchableOpacity className="w-full items-end" onPress={handlePress}>
      <AntDesign
        name="closecircle"
        color={Colors.light.tint}
        size={28}
        strokeWidth={2}
      />
    </TouchableOpacity>
    {children}
  </View>
);

const CenterContainer = ({
  children,
  height,
  handlePress,
}: IModalContentContainerProps) => (
  <View
    className={`absolute w-full flex-col gap-y-2 bg-transparent p-6`}
    style={{
      height: height ? height : undefined,
      top: height ? height * 0.2 : Dimensions.get("window").height * 0.2,
    }}
  >
    {children}
    <TouchableOpacity className="w-full items-center" onPress={handlePress}>
      <AntDesign name="closecircleo" color="white" size={35} strokeWidth={4} />
    </TouchableOpacity>
  </View>
);
