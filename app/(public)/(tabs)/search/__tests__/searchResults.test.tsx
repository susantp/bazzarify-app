import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { InfiniteProductGridProps } from "@/modules/core/components/InfiniteProductGrid";
import type { TProductSearchPayload } from "@/modules/product/schemas/responsePayloads/ProductSearchPayloadSchema";
import SearchResultsPage from "@/app/(public)/(tabs)/search/[query]";

type SearchPage = TProductSearchPayload | null;
type SearchProduct = NonNullable<
  NonNullable<TProductSearchPayload["products"]>["data"]
>[number];
type GridProps = InfiniteProductGridProps<SearchPage, SearchProduct>;

const mockGridProps: GridProps[] = [];
const mockFilterCounts: number[] = [];
const mockSearchQueries: string[] = [];
const mockSetFilters = jest.fn();
const mockSearchFilters = {
  multiple: { categories: ["category-a"] },
  range: { price_range: { min: "", max: "" } },
};
let mockSearchResponse: unknown;

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ query: "hoodie" }),
}));
jest.mock("jotai", () => ({
  useAtom: (atom: string) => [
    atom === "searchFiltersAtom" ? mockSearchFilters : "hoodie",
    jest.fn(),
  ],
  useSetAtom: () => mockSetFilters,
}));
jest.mock("@/atoms/searchFiltersAtom", () => ({
  activeSearchQueryAtom: "activeSearchQueryAtom",
  searchFiltersAtom: "searchFiltersAtom",
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
  default: (query: string) => {
    mockSearchQueries.push(query);
    return mockSearchResponse;
  },
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
jest.mock("@/modules/core/components/InfiniteProductGrid", () => ({
  __esModule: true,
  default: (props: GridProps) => {
    mockGridProps.push(props);
    return props.queryResult.isError
      ? (props.listErrorComponent ?? null)
      : null;
  },
}));
jest.mock("@/components/common/ProductCard", () => () => null);
jest.mock("@/modules/product/components/FilterTriggerButton", () => ({
  FilterTriggerButton: ({ appliedCount }: { appliedCount: number }) => {
    mockFilterCounts.push(appliedCount);
    return null;
  },
}));
jest.mock("@/modules/product/components/CustomFilterComponent", () => ({
  CustomFilterComponent: () => null,
}));
jest.mock("@gorhom/bottom-sheet", () => {
  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) => children ?? null,
    BottomSheetBackdrop: () => null,
    BottomSheetScrollView: ({ children }: { children?: React.ReactNode }) =>
      children ?? null,
  };
});

const searchPayload = (
  products: SearchProduct[] | null,
): TProductSearchPayload =>
  ({
    products: {
      data: products,
      current_page: 1,
      next_page_url: null,
    },
    currency: { code: "USD" },
  }) as TProductSearchPayload;

const makeQueryResult = (
  data: { pages: SearchPage[]; pageParams: number[] } | undefined,
  isError: boolean,
) =>
  ({
    data,
    isSuccess: !isError && data !== undefined,
    isLoading: false,
    isError,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
  }) as unknown as GridProps["queryResult"];

const currentGridProps = () => mockGridProps.at(-1)!;
const renderSearchResults = () =>
  render(
    <BazarifyThemeProvider>
      <SearchResultsPage />
    </BazarifyThemeProvider>,
  );

describe("SearchResultsPage", () => {
  beforeEach(() => {
    mockGridProps.length = 0;
    mockFilterCounts.length = 0;
    mockSearchQueries.length = 0;
    mockSetFilters.mockClear();
    mockSearchResponse = {
      queryResult: makeQueryResult(undefined, true),
      metadata: {},
    };
  });

  it("shows owned retry feedback without exposing transport details", async () => {
    const screen = await renderSearchResults();

    expect(screen.getByTestId("search-results-error")).toBeTruthy();
    expect(screen.getByText("Couldn't load search results")).toBeTruthy();
    expect(mockFilterCounts.at(-1)).toBe(1);
    expect(mockSetFilters).not.toHaveBeenCalled();
    expect(
      screen.queryByText("An error occurred while fetching search results."),
    ).toBeNull();

    const refetch = currentGridProps().queryResult.refetch;
    await fireEvent.press(screen.getByRole("button", { name: "Retry" }));

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(mockSearchQueries.at(-1)).toBe("hoodie");
    expect(mockSetFilters).not.toHaveBeenCalled();
  });

  it("passes an owned empty state for successful empty results", async () => {
    mockSearchResponse = {
      queryResult: makeQueryResult(
        { pages: [searchPayload([])], pageParams: [1] },
        false,
      ),
      metadata: null,
    };

    await renderSearchResults();

    expect(currentGridProps().listEmptyComponent?.props).toMatchObject({
      title: "No products found",
      testID: "search-results-empty",
    });
  });

  it("keeps query, filter count, and UUID identity across rerenders", async () => {
    const first = { uuid: "product-a" } as SearchProduct;
    mockSearchResponse = {
      queryResult: makeQueryResult(
        { pages: [searchPayload([first])], pageParams: [1] },
        false,
      ),
      metadata: {},
    };

    const screen = await renderSearchResults();
    let props = currentGridProps();
    let items = props.queryResult.data?.pages.flatMap((page) =>
      page ? props.selectItems(page) : [],
    );

    expect(items).toEqual([first]);
    expect(props.keyExtractor(first, 0)).toBe("product-a");
    const renderedCard = props.renderItem({
      item: first,
      index: 0,
      separators: {
        highlight: jest.fn(),
        unhighlight: jest.fn(),
        updateProps: jest.fn(),
      },
    });
    expect(renderedCard?.props).toMatchObject({
      item: first,
      cols: 2,
    });
    expect(renderedCard?.key).toBeNull();
    expect(mockFilterCounts.at(-1)).toBe(1);

    const next = { uuid: "product-new" } as SearchProduct;
    mockSearchResponse = {
      queryResult: makeQueryResult(
        { pages: [searchPayload([next, first])], pageParams: [1] },
        false,
      ),
      metadata: {},
    };

    await screen.rerender(
      <BazarifyThemeProvider>
        <SearchResultsPage />
      </BazarifyThemeProvider>,
    );

    props = currentGridProps();
    items = props.queryResult.data?.pages.flatMap((page) =>
      page ? props.selectItems(page) : [],
    );

    expect(
      items?.map((item, index) => props.keyExtractor(item, index)),
    ).toEqual(["product-new", "product-a"]);
    expect(mockSearchQueries).toEqual(["hoodie", "hoodie"]);
    expect(mockFilterCounts.at(-1)).toBe(1);
  });
});
