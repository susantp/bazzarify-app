import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import VoucherCenter from "@/app/(private)/(tabs)/account/voucherCenter";

jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/components/common/CouponComponent", () => () => null);
jest.mock("@/modules/core/components/ThemedLoader", () => () => null);

describe("VoucherCenter", () => {
  it("keeps the voucher cards data-driven and titled", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <VoucherCenter />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Voucher Center")).toBeTruthy();
    expect(screen.getByText("New User Voucher")).toBeTruthy();
  });
});
