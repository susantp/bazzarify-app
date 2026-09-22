import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import FullNameInput from "@/components/account/FullNameInput";

describe("FullNameInput", () => {
  it("keeps the standalone full-name field data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <FullNameInput defaultValue="Bazarify User" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByDisplayValue("Bazarify User")).toBeTruthy();
    expect(screen.getByPlaceholderText("Your email/number")).toBeTruthy();
  });
});
