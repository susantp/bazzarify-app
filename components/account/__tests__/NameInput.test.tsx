import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import NameInput from "@/components/account/NameInput";

describe("NameInput", () => {
  it("keeps the name field and validation feedback reusable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <NameInput
          value="Bazarify User"
          onBlur={jest.fn()}
          onChange={jest.fn()}
          hasError={{ message: "Name is required", type: "required" }}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByDisplayValue("Bazarify User")).toBeTruthy();
    expect(screen.getByText("Name is required")).toBeTruthy();
  });
});
