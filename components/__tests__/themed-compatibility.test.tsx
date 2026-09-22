import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

describe("legacy themed component adapters", () => {
  it("keeps legacy text variants on owned typography tokens", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ThemedText type="defaultSemiBold">Saved</ThemedText>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Saved")).toHaveStyle({
      fontSize: 12,
      fontWeight: "600",
    });
  });

  it("keeps custom themed colors while using the owned view primitive", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ThemedView lightColor="#123456" testID="themed-view" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByTestId("themed-view")).toHaveStyle({
      backgroundColor: "#123456",
    });
  });
});
