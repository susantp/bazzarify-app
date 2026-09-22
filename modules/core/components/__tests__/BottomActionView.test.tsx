import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Text } from "@/components/design-system";
import BottomActionView from "@/modules/core/components/BottomActionView";

describe("BottomActionView", () => {
  it("keeps its child content inside the themed action surface", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <BottomActionView>
          <Text>Action content</Text>
        </BottomActionView>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Action content")).toBeTruthy();
  });
});
