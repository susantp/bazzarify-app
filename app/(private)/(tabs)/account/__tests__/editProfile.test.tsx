import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import EditProfileScreen from "@/app/(private)/(tabs)/account/editProfile";

jest.mock("jotai", () => ({
  atom: (value: unknown) => value,
  useAtomValue: (value: unknown) => value,
}));
jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));
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
jest.mock("@/components/common/TextInputV1", () => ({
  __esModule: true,
  default: ({ placeholder }: { placeholder: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{placeholder}</Text>;
  },
}));

describe("EditProfileScreen", () => {
  it("keeps the profile fields and password section visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <EditProfileScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Edit Profile")).toBeTruthy();
    expect(screen.getByText("Update Password")).toBeTruthy();
    expect(screen.getByText("Update")).toBeTruthy();
    expect(screen.getByLabelText("Add profile image")).toBeTruthy();
  });
});
