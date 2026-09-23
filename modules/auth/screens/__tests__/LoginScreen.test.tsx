import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import LoginScreen from "@/modules/auth/screens/LoginScreen";

jest.mock("expo-router", () => ({ router: { push: jest.fn() } }));
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (callback: () => void) => callback,
    formState: { errors: {}, isSubmitting: false },
  }),
}));
jest.mock("@/modules/auth/hooks/useLoginHook", () => ({
  __esModule: true,
  default: () => ({
    showPassword: false,
    handleOAuthLogin: jest.fn(),
    handleCredentialsLogin: jest.fn(),
    handleShowPassword: jest.fn(),
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
jest.mock("@/components/account/LoginFormHelperText", () => () => null);
jest.mock("@/components/account/FullWidthActionBtn", () => () => null);
jest.mock("@/components/common/ControlledInput", () => () => null);
jest.mock("@/components/account/UsernameInput", () => () => null);
jest.mock("@/components/account/UserPasswordInput", () => () => null);
jest.mock(
  "@/components/account/SocialLoginButton",
  () =>
    ({
      label,
      provider,
      onPress,
    }: {
      label: string;
      provider: string;
      onPress: () => void;
    }) => {
      const { Pressable, Text } = jest.requireActual("react-native");

      return (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label} ${provider}`}
          onPress={onPress}
        >
          <Text>{provider}</Text>
        </Pressable>
      );
    },
);

describe("LoginScreen", () => {
  it("keeps signup and social actions navigable", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <LoginScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Welcome back, sign in to continue")).toBeTruthy();
    fireEvent.press(screen.getByText("Sign Up"));
    expect(router.push).toHaveBeenCalledWith("/auth/register");
    expect(
      screen.getByRole("button", { name: "sign in with google" }),
    ).toBeTruthy();
  });
});
