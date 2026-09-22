import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import NumberInput from "@/components/account/NumberInput";

describe("NumberInput", () => {
  it("keeps numeric keyboard and field validation behavior reusable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <NumberInput
          value="9800000000"
          onBlur={jest.fn()}
          onChange={jest.fn()}
          hasError={{ message: "Invalid phone", type: "validate" }}
          placeholder="Phone"
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByDisplayValue("9800000000").props.keyboardType).toBe(
      "number-pad",
    );
    expect(screen.getByText("Invalid phone")).toBeTruthy();
  });
});
