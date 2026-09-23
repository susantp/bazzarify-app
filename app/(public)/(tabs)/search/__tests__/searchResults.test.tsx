import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import SearchResultsPage from "@/app/(public)/(tabs)/search/[query]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ query: "hoodie" }),
}));
jest.mock("jotai", () => ({
  useAtom: () => [
    {
      multiple: { categories: [] },
      range: { price_range: { min: "", max: "" } },
    },
    jest.fn(),
  ],
  useSetAtom: () => jest.fn(),
}));
jest.mock("@/atoms/searchFiltersAtom", () => ({
  activeSearchQueryAtom: {},
  searchFiltersAtom: {},
}));
jest.mock("@/hooks/useSearchBarHook", () => ({
  __esModule: true,
  default: () => ({
    canGoBack: true,
    onSearchSubmit: jest.fn(),
    handleChangeText: jest.fn(),
    searchQuery: "hoodie",
  }),
}));
jest.mock("@/modules/product/hooks/useProductSearch", () => ({
  __esModule: true,
  default: () => ({
    queryResult: { isSuccess: false, isLoading: false, isError: true },
    metadata: null,
  }),
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/NormalTopBar", () => () => null);
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/modules/core/components/ThemedLoader", () => () => null);
jest.mock("@/modules/core/components/InfiniteProductGrid", () => () => null);
jest.mock("@/components/common/ProductCard", () => () => null);
jest.mock("@/modules/product/components/FilterTriggerButton", () => ({
  FilterTriggerButton: () => null,
}));
jest.mock("@/modules/product/components/CustomFilterComponent", () => ({
  CustomFilterComponent: () => null,
}));
jest.mock("@gorhom/bottom-sheet", () => {
  const ReactRuntime = require("react");

  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) =>
      ReactRuntime.createElement(ReactRuntime.Fragment, null, children),
    BottomSheetBackdrop: () => null,
    BottomSheetScrollView: ({ children }: { children?: React.ReactNode }) =>
      ReactRuntime.createElement(ReactRuntime.Fragment, null, children),
  };
});

describe("SearchResultsPage", () => {
  it("keeps the search error state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <SearchResultsPage />
      </BazarifyThemeProvider>,
    );

    expect(
      screen.getByText("An error occurred while fetching search results."),
    ).toBeTruthy();
  });
});
