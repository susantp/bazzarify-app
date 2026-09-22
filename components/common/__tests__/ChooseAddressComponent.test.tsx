import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ChooseAddressComponent from "@/components/common/ChooseAddressComponent";

describe("ChooseAddressComponent", () => {
  it("keeps the location prompt and sign-in action visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ChooseAddressComponent />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Choose your delivery location.")).toBeTruthy();
    expect(
      screen.getByText(
        /Select a delivery location to see product availability/i,
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Sign in to see your address" }),
    ).toBeTruthy();
  });
});
