import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import cn from "@/utils/tailwindHelper";

interface SafeAreaWrapperProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
}

export const SafeAreaWrapper = ({
  children,
  className,
}: SafeAreaWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className={cn("flex-col", "bg-orange-600", className)}
        style={{ flex: 1 }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
