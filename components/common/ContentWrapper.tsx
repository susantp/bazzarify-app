import { StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Box, PageContent } from "@/components/design-system";

interface ContentWrapperProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const ContentWrapper = ({ children, styles }: ContentWrapperProps) => {
  return (
    <PageContent style={styles}>
      <Box flex={1}>{children}</Box>
    </PageContent>
  );
};
export default ContentWrapper;
