import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import SearchPage from "@/app/(public)/(tabs)/search";

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/NormalTopBar", () => () => null);
jest.mock("@/hooks/useSearchBarHook", () => ({
  __esModule: true,
  default: () => ({
    canGoBack: false,
    onSearchSubmit: jest.fn(),
    handleChangeText: jest.fn(),
    searchQuery: "",
  }),
}));
jest.mock("@/modules/search/hooks/useSearchHistory", () => ({
  __esModule: true,
  default: () => ({
    history: [],
    clearAll: jest.fn(),
    removeEntry: jest.fn(),
    addEntry: jest.fn(),
    actor: { type: "guest" },
  }),
}));

describe("SearchPage", () => {
  it("keeps the empty search-history state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SearchPage />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Search History")).toBeTruthy();
    expect(
      screen.getByText(
        "Your recent searches will appear here once you start browsing.",
      ),
    ).toBeTruthy();
    expect(screen.getByLabelText("Clear all search history")).toBeTruthy();
  });
});
