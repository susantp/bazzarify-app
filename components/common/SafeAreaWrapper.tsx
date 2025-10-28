import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import cn from "@/utils/tailwindHelper";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeAreaWrapper = ({
  children,
  className,
}: SafeAreaWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["top", "left", "right", "bottom"]}
        style={{ flex: 1 }}
        className={cn("flex-col bg-orange-600", className)}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
