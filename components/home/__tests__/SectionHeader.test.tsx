import React from "react";
import { render } from "@testing-library/react-native";
import SectionHeader from "@/components/home/SectionHeader";
import PageTitle from "@/components/account/PageTitle";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: any }) => children,
}));

describe("shared typography compositions", () => {
  it("renders section and page titles through owned text contracts", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SectionHeader title="Popular products" testID="section-header" />
        <PageTitle title="Login" />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("section-header")).toBeTruthy();
    expect(screen.getByText("Popular products")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });
});
