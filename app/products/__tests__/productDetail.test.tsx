import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ProductScreen from "@/app/products/[uuid]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ uuid: "product-1" }),
  router: { push: jest.fn() },
}));
jest.mock("jotai", () => ({
  useAtom: () => [false, jest.fn()],
  useAtomValue: () => null,
}));
jest.mock("@/atoms/addressModalAtom", () => ({ addressModalAtom: {} }));
jest.mock("@/modules/cart/atoms", () => ({ selectedDeliveryAddress: {} }));
jest.mock("@/modules/user/atoms/addresessAtom", () => ({
  getDefaultAddressAtom: {},
}));
jest.mock("@/modules/product/hooks/useProductScreen", () => ({
  __esModule: true,
  default: () => ({
    product: null,
    currency: null,
    selectedVariant: null,
    handleVariantChange: jest.fn(),
    selectedVariantAvailableToSell: 0,
    selectedVariantCanSell: false,
    requiresCustomerSelection: false,
    hasConcreteSku: false,
    isError: false,
  }),
}));
jest.mock("@/modules/cart/hooks/useCartHook", () => ({
  __esModule: true,
  default: () => ({ handleAddToCart: jest.fn() }),
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/home/TopBar", () => () => null);
jest.mock("@/modules/core/components/ThemedLoader", () => () => {
  const { Text } = jest.requireActual("react-native");

  return <Text>Loading product</Text>;
});
jest.mock("@/modules/core/components/FetchingErrorComponent", () => () => null);
jest.mock(
  "@/components/product/ProductScreenContainer",
  () =>
    ({ children }: { children: React.ReactNode }) => <>{children}</>,
);
jest.mock(
  "@/components/product/ProductGenericDetails",
  () =>
    ({ children }: { children: React.ReactNode }) => <>{children}</>,
);
jest.mock("@/components/product/ProductDeliveryDetails", () => () => null);
jest.mock("@/components/product/ProductDescription", () => () => null);
jest.mock("@/components/product/ProductSpecification", () => () => null);
jest.mock("@/modules/product/components/ProductSlider", () => () => null);
jest.mock(
  "@/modules/product/components/ProductCouponDiscountInfo",
  () => () => null,
);
jest.mock(
  "@/modules/product/components/ProductPriceComponent",
  () => () => null,
);
jest.mock(
  "@/modules/product/components/ProductVariantSelector",
  () => () => null,
);
jest.mock("@/modules/core/components/BottomActionView", () => () => null);
jest.mock("@/modules/core/components/ProductPageBottomView", () => () => null);
jest.mock("@/components/common/DemoModalComponent", () => () => null);
jest.mock("@/modules/user/components/DeliveryAddressPicker", () => () => null);

describe("ProductScreen", () => {
  it("keeps the loading state visible while the product is unavailable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProductScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Loading product")).toBeTruthy();
  });
});
