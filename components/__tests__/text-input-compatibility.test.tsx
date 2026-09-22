import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import TextInputV1 from "@/components/common/TextInputV1";

describe("TextInputV1 compatibility adapter", () => {
  it("delegates the legacy legend to the owned input label", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TextInputV1 legend="Display name" placeholder="Optional" />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByLabelText("Display name")).toBeTruthy();
  });
});
