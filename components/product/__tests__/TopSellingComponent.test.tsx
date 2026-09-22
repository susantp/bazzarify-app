import React from "react";
import { render } from "@testing-library/react-native";
import TopSellingComponent from "@/components/product/TopSellingComponent";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("TopSellingComponent", () => {
  it("renders each top-selling item from the display data", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TopSellingComponent />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Top Selling Products")).toBeTruthy();
    expect(
      screen.getAllByText("Ultima watch circle 2.0 smartwatch"),
    ).toHaveLength(3);
    expect(screen.getAllByText("Rs. 3,499")).toHaveLength(3);
  });
});
