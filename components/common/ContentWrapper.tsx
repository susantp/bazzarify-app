import { Animated, StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

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
  const tabBarHeight = useBottomTabBarHeight();
  const defaultStyles = { paddingBottom: tabBarHeight };
  return (
    <View
      style={defaultStyles}
      className={cn(`flex-1 flex-col bg-white`, className)}
    >
      {children}
    </View>
  );
};
export default ContentWrapper;
