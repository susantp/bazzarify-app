import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { MapView } from "@/modules/core/components/MapView";

jest.mock("expo-maps", () => {
  throw new Error("ExpoMaps native module is unavailable");
});

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

describe("MapView native-module fallback", () => {
  it("renders the reusable empty state when ExpoMaps is unavailable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <MapView
          onClick={jest.fn()}
          onClose={jest.fn()}
          onConfirm={jest.fn()}
        />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByText("Map unavailable")).toBeTruthy();
  });
});
