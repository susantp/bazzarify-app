import React from "react";
import {
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
}

const DemoModalComponent = ({
  children,
  showModal,
  handlePress,
}: IDemoModalComponent) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View
        className={`absolute bottom-0 z-30 w-full flex-col gap-y-2 border-t border-t-gray-400 bg-white p-6`}
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
    </Modal>
  );
};
export default DemoModalComponent;
