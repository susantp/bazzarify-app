import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";
import { PageContent } from "@/components/design-system/compositions";

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
    <PageContent style={styles}>
      <View style={{ flex: 1 }} className={cn("flex-col", className)}>
        {children}
      </View>
    </PageContent>
  );
};
export default ContentWrapper;
