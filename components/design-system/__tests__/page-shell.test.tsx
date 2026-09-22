import React from "react";
import { render } from "@testing-library/react-native";
import { PageShell } from "@/components/design-system/compositions";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Text } from "@/components/design-system/primitives";

jest.mock("react-native-gesture-handler", () => ({
  GestureHandlerRootView: ({ children }: { children: unknown }) => {
    const ReactLib = require("react");
    const { View: NativeView } = require("react-native");

    return ReactLib.createElement(NativeView, null, children);
  },
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }: { children: unknown }) => {
    const ReactLib = require("react");
    const { View: NativeView } = require("react-native");

    return ReactLib.createElement(NativeView, null, children);
  },
  SafeAreaView: ({ children, ...props }: { children: unknown }) => {
    const ReactLib = require("react");
    const { View: NativeView } = require("react-native");

    return ReactLib.createElement(NativeView, props, children);
  },
}));

describe("PageShell composition", () => {
  it("provides a token-backed page surface around its content", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PageShell contentBackgroundColor="surfaceMuted">
          <Text testID="page-content">Catalog</Text>
        </PageShell>
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("page-content")).toHaveTextContent(
      "Catalog",
    );
  });
});
