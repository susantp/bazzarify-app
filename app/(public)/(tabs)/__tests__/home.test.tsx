import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import HomeScreen from "@/app/(public)/(tabs)/index";

jest.mock("jotai", () => ({
  useAtom: () => [false, jest.fn()],
  useAtomValue: () => null,
}));
jest.mock("@/atoms/locationAtom", () => ({
  geocodeAddressAtom: {},
  locationErrorAtom: {},
}));
jest.mock("@/modules/core/atoms/homePopupAtom", () => ({
  __esModule: true,
  default: {},
}));
jest.mock("@/modules/home/hooks/useHomeScreenHook", () => ({
  __esModule: true,
  default: () => ({
    CARDS: [],
    refreshing: false,
    onRefresh: jest.fn(),
    justForYouProductsQueryResult: { isLoading: false },
  }),
}));
jest.mock("@/modules/core/hooks/useLocation", () => ({
  useLocation: () => ({ refresh: jest.fn() }),
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/home/TopBar", () => () => null);
jest.mock("@/components/home/DeliveryBar", () => () => null);
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/components/common/DemoModalComponent", () => () => null);
jest.mock("@/modules/core/components/ThemedLoader", () => () => null);

describe("HomeScreen", () => {
  it("keeps the empty home state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <HomeScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("No child categories found")).toBeTruthy();
  });
});
