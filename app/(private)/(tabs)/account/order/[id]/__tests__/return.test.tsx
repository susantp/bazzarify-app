import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ReturnForm from "@/app/(private)/(tabs)/account/order/[id]/return";

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

describe("ReturnForm", () => {
  it("keeps the return reasons and submit action visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ReturnForm />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Return")).toBeTruthy();
    expect(screen.getByText("I Changed My Mind")).toBeTruthy();
    expect(screen.getByText("Product Is Damaged")).toBeTruthy();
    expect(screen.getByLabelText("Submit return request")).toBeTruthy();
  });
});
