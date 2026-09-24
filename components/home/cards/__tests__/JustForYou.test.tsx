import { render } from "@testing-library/react-native";
import type { ReactNode } from "react";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import type { InfiniteProductGridProps } from "@/modules/core/components/InfiniteProductGrid";
import type { TJustForYouProductsPayload } from "@/modules/product/schemas/responsePayloads/JustForYouProductsPayloadSchema";
import JustForYou from "../JustForYou";

type TestProduct = { uuid: string };
type GridPage = TJustForYouProductsPayload | null;
type GridProps = InfiniteProductGridProps<GridPage, TestProduct>;

const mockGridProps: GridProps[] = [];

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: ReactNode }) => children,
}));

jest.mock("@/modules/core/components/InfiniteProductGrid", () => ({
  __esModule: true,
  default: (props: GridProps) => {
    mockGridProps.push(props);
    return null;
  },
}));

jest.mock("@/components/common/ProductCard", () => ({
  __esModule: true,
  default: () => null,
}));

const queryResult = (
  products: (TestProduct | null)[] = [],
  overrides: Record<string, unknown> = {},
) =>
  ({
    data: {
      pages: [
        {
          justForYouProducts: {
            data: products as TJustForYouProductsPayload["justForYouProducts"]["data"],
          },
        },
      ],
      pageParams: [1],
    },
    isLoading: false,
    isError: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    ...overrides,
  }) as never;

const renderJustForYou = (result = queryResult()) => {
  mockGridProps.length = 0;

  return render(
    <BazarifyThemeProvider>
      <JustForYou queryResult={result} />
    </BazarifyThemeProvider>,
  );
};

const currentGridProps = () => mockGridProps.at(-1)!;

describe("JustForYou", () => {
  it("passes retryable recommendation error feedback to the grid", async () => {
    const refetch = jest.fn();
    await renderJustForYou(
      queryResult([], { data: undefined, isError: true, refetch }),
    );

    const errorState = currentGridProps().listErrorComponent;
    const errorProps = errorState?.props as
      { title: string; action?: { onPress: () => void } } | undefined;
    expect(errorProps?.title).toBe("Couldn't load recommendations");
    errorProps?.action?.onPress();

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it("passes recommendation-specific empty feedback to the grid", async () => {
    await renderJustForYou(queryResult());

    const emptyProps = currentGridProps().listEmptyComponent?.props as
      { title: string } | undefined;
    expect(emptyProps?.title).toBe("No recommendations yet");
  });

  it("filters nullable products and keeps UUID identity after rerenders", async () => {
    const product = { uuid: "product-a" };
    const screen = await renderJustForYou(queryResult([null, product]));
    let props = currentGridProps();
    let items = props.queryResult.data?.pages.flatMap((page) =>
      page ? props.selectItems(page) : [],
    );

    expect(items).toEqual([product]);
    expect(props.keyExtractor(product, 0)).toBe("product-a");
    const renderedProduct = props.renderItem({
      item: product,
      index: 0,
      separators: {
        highlight: jest.fn(),
        unhighlight: jest.fn(),
        updateProps: jest.fn(),
      },
    });
    expect(renderedProduct?.props).toMatchObject({ item: product, cols: 2 });

    await screen.rerender(
      <BazarifyThemeProvider>
        <JustForYou
          queryResult={queryResult([{ uuid: "product-new" }, product])}
        />
      </BazarifyThemeProvider>,
    );

    props = currentGridProps();
    items = props.queryResult.data?.pages.flatMap((page) =>
      page ? props.selectItems(page) : [],
    );

    expect(
      items?.map((item, index) => props.keyExtractor(item, index)),
    ).toEqual(["product-new", "product-a"]);
  });
});
