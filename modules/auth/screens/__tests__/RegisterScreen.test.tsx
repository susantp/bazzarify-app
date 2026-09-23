import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import RegisterScreen from "@/modules/auth/screens/RegisterScreen";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    setError: jest.fn(),
    handleSubmit: (callback: () => void) => callback,
    formState: { errors: {}, isSubmitting: false },
  }),
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock(
  "@/components/account/PageTitle",
  () =>
    ({ title }: { title: string }) => {
      const { Text } = jest.requireActual("react-native");

      return <Text>{title}</Text>;
    },
);
jest.mock("@/components/account/FullWidthActionBtn", () => () => null);
jest.mock("@/components/common/ControlledInput", () => () => null);
jest.mock("@/components/account/NameInput", () => () => null);
jest.mock("@/components/account/UsernameInput", () => () => null);
jest.mock("@/components/account/UserPasswordInput", () => () => null);
jest.mock(
  "@/components/account/SocialLoginButton",
  () =>
    ({ label, provider }: { label: string; provider: string }) => {
      const { Text } = jest.requireActual("react-native");

      return <Text>{`${label} ${provider}`}</Text>;
    },
);

describe("RegisterScreen", () => {
  it("keeps the registration copy and provider choices visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <RegisterScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Create your account to get started")).toBeTruthy();
    expect(screen.getByText("register with google")).toBeTruthy();
    expect(screen.getByText("Sign In")).toBeTruthy();
  });
});
