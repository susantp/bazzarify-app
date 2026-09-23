import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import FlashDealPage from "@/app/(public)/(tabs)/categories/flashDeal";

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

describe("FlashDealPage", () => {
  it("keeps discount choices data-driven and updates the selected label", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <FlashDealPage />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Choose your discount")).toBeTruthy();
    await fireEvent.press(screen.getByLabelText("30%"));
    expect(await screen.findByText("30% Discount")).toBeTruthy();
    expect(screen.getByLabelText("Filter flash deals")).toBeTruthy();
  });
});
