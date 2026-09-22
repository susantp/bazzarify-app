import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Text } from "@/components/design-system";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";

jest.mock("react-native-gesture-handler", () => ({
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("react-native-safe-area-context", () => {
  const ReactNative = require("react-native");
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    SafeAreaView: ReactNative.View,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

describe("SafeAreaWrapper", () => {
  it("keeps children inside the native page shell", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SafeAreaWrapper>
          <Text>Screen content</Text>
        </SafeAreaWrapper>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Screen content")).toBeTruthy();
  });
});
