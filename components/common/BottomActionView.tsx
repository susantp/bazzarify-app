import { LayoutChangeEvent, View } from "react-native";
import React from "react";

interface BottomActionViewProps {
  children: React.ReactNode;
  onLayoutEvent?: (event: LayoutChangeEvent) => void;
}

const BottomActionView = ({
  children,
  onLayoutEvent,
}: BottomActionViewProps) => {
  return (
    <View
      onLayout={onLayoutEvent}
      style={{
        position: "absolute",
        bottom: 0,
      }}
      className={`w-full border border-gray-400 bg-white`}
    >
      {children}
    </View>
  );
};

export default BottomActionView;
