import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PopularCategoryScreen from "@/app/(public)/(tabs)/categories/popular";

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

describe("PopularCategoryScreen", () => {
  it("keeps the title and filter affordance visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PopularCategoryScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Popular Items")).toBeTruthy();
    expect(screen.getByLabelText("Filter popular items")).toBeTruthy();
  });
});
