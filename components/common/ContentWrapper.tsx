import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  styles?: StyleProp<ViewStyle>;
}

const ContentWrapper = ({
  children,
  className,
  styles,
}: ContentWrapperProps) => {
  return (
    <View className={cn(`flex-1 flex-col bg-white`, className)}>
      {children}
    </View>
  );
};
export default ContentWrapper;
