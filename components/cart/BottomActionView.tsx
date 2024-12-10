import { LayoutChangeEvent, View } from "react-native";
import React from "react";
import { CartItemObject } from "@/atoms/cartScreen/cartAction.atom";

interface BottomActionViewProps {
  items: CartItemObject[];
  children: React.ReactNode;
  onLayoutEvent?: (event: LayoutChangeEvent) => void;
}

const BottomActionView = ({
  items,
  children,
  onLayoutEvent,
}: BottomActionViewProps) => {
  return (
    items.length > 0 && (
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
    )
  );
};

export default BottomActionView;
