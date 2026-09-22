import React from "react";
import cn from "@/utils/tailwindHelper";
import { View } from "react-native";
import { PageShell } from "@/components/design-system/compositions";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeAreaWrapper = ({
  children,
  className,
}: SafeAreaWrapperProps) => {
  return (
    <PageShell>
      <View style={{ flex: 1 }} className={cn("flex-col", className)}>
        {children ? children : null}
      </View>
    </PageShell>
  );
};
