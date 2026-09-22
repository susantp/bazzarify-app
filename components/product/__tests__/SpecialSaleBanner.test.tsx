import React from "react";
import { render } from "@testing-library/react-native";
import SpecialSaleBanner from "@/components/product/SpecialSaleBanner";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("SpecialSaleBanner", () => {
  it("keeps sale pricing and countdown data-driven", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SpecialSaleBanner
          item={
            {
              base_price: 1000,
              price: 800,
              specialSale: {
                name: "Weekend sale",
                discount: 20,
                discountType: "percent",
                endDate: new Date(Date.now() + 86_400_000).toISOString(),
              },
            } as never
          }
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Weekend sale")).toBeTruthy();
    expect(screen.getByText("Rs. 640")).toBeTruthy();
    expect(screen.getByText("-20%")).toBeTruthy();
  });
});
