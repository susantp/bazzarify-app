import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import cn from "@/utils/tailwindHelper";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeAreaWrapper = ({
  children,
  className,
}: SafeAreaWrapperProps) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          edges={["top", "left", "right", "bottom"]}
          style={{ flex: 1 }}
          className={cn("flex-col bg-primary", className)}
        >
          <View style={{ flex: 1, backgroundColor: "#ffff" }}>
            {children ? children : null}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
