import React from "react";
import { render } from "@testing-library/react-native";
import PolygonFreeDelivery from "@/modules/product/components/PolygonFreeDelivery";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("PolygonFreeDelivery", () => {
  it("keeps the free-delivery badge visible through owned contracts", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PolygonFreeDelivery />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("FREE DELIVERY")).toBeTruthy();
  });
});
