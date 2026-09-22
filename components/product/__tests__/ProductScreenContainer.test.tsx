import React from "react";
import { render } from "@testing-library/react-native";
import ProductScreenContainer from "@/components/product/ProductScreenContainer";
import ProductCouponDiscountInfo from "@/modules/product/components/ProductCouponDiscountInfo";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("product shell compositions", () => {
  it("keeps the product container composable and the coupon message visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductScreenContainer>
          <ProductCouponDiscountInfo />
        </ProductScreenContainer>
      </BazarifyThemeProvider>,
    );

    expect(
      screen.getByText("Get extra discount with coupon on shopping"),
    ).toBeTruthy();
  });
});
