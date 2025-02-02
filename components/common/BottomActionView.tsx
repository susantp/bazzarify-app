import { View } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";

interface BottomActionViewProps {
  children: React.ReactNode;
  className?: string;
}

const BottomActionView = ({ children, className }: BottomActionViewProps) => {
  return (
    <View
      className={cn(
        "w-full",
        "flex-col-reverse",
        "border",
        "border-gray-400",
        "bg-white",
        className,
      )}
    >
      {children}
    </View>
  );
};

export default BottomActionView;
