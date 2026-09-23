import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import VerifyPasswordResetScreen from "@/modules/auth/screens/VerifyPasswordResetScreen";

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
  useLocalSearchParams: () => ({ email: "user@example.com", phone: "123" }),
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
jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));
jest.mock(
  "@/components/account/PageTitle",
  () =>
    ({ title }: { title: string }) => {
      const { Text } = jest.requireActual("react-native");

      return <Text>{title}</Text>;
    },
);
jest.mock("@/components/common/ControlledInput", () => () => null);
jest.mock("@/components/account/NumberInput", () => () => null);
jest.mock("@/components/account/UserPasswordInput", () => () => null);
jest.mock("@/components/account/FullWidthActionBtn", () => () => null);
jest.mock("@/modules/core/utils/axios", () => ({
  axiosInstance: { post: jest.fn() },
}));

describe("VerifyPasswordResetScreen", () => {
  it("keeps the reset title and update action boundary visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <VerifyPasswordResetScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getAllByText("Forget Password")).toHaveLength(2);
  });
});
