import { View } from "react-native";
import React from "react";

interface BottomActionViewProps {
  children: React.ReactNode;
  // onLayoutEvent?: (event: LayoutChangeEvent) => void;
}

const BottomActionView = ({ children }: BottomActionViewProps) => {
  return (
    <View className={`w-full flex-col-reverse border border-gray-400 bg-white`}>
      {children}
    </View>
  );
};

export default BottomActionView;
