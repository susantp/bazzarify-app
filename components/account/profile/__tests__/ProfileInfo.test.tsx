import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ProfileInfo from "@/components/account/profile/ProfileInfo";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe("ProfileInfo", () => {
  it("keeps the profile summary and safe fallback copy", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ProfileInfo user={null} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("User User")).toBeTruthy();
    expect(screen.getByText("Verified")).toBeTruthy();
    expect(screen.getByText("0 WishList")).toBeTruthy();
    expect(screen.getByText("2 Stores Followed")).toBeTruthy();
  });
});
