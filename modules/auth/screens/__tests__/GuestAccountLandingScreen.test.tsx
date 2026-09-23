import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import GuestAccountLandingScreen from "@/modules/auth/screens/GuestAccountLandingScreen";

jest.mock("expo-router", () => ({ router: { push: jest.fn() } }));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/components/common/PolygonButton", () => ({
  __esModule: true,
  default: ({ label, onPress }: { label: string; onPress: () => void }) => {
    const { Pressable, Text } = jest.requireActual("react-native");

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
      >
        <Text>{label}</Text>
      </Pressable>
    );
  },
}));

describe("GuestAccountLandingScreen", () => {
  it("keeps login, registration, and guest menu actions visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <GuestAccountLandingScreen />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Login" }));
    expect(router.push).toHaveBeenCalledWith("/auth/login");
    expect(
      screen.getByRole("button", { name: "Bazzarify Support" }),
    ).toBeTruthy();
  });
});
