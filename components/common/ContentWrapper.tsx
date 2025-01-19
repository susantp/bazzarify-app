import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";

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
  const mergedClasses = [
    ...new Set(["flex-1", "flex-col", ...(className?.split(" ") || [])]),
  ].join(" ");
  return (
    <View style={styles} className={mergedClasses}>
      {children}
    </View>
  );
};
export default ContentWrapper;
