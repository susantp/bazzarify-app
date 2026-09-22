import React from "react";
import { render } from "@testing-library/react-native";
import { GridWrapper } from "@/components/home/ContentGridSection";
import { BazarifyThemeProvider, Text } from "@/components/design-system";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe("GridWrapper", () => {
  it("provides the shared token-backed section surface", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <GridWrapper title="Popular products" testID="grid-wrapper">
          <Text>Products</Text>
        </GridWrapper>
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("grid-wrapper")).toBeTruthy();
    expect(screen.getByText("Popular products")).toBeTruthy();
    expect(screen.getByText("Products")).toBeTruthy();
  });
});
