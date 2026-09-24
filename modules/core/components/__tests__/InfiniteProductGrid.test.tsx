import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import type { InfiniteData } from "@tanstack/query-core";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import InfiniteProductGrid from "../InfiniteProductGrid";

describe("InfiniteProductGrid", () => {
  it("renders the caller-provided empty state when no items are available", async () => {
    const queryResult = {
      data: { pages: [{ items: [] }], pageParams: [undefined] },
      isLoading: false,
      isError: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
    } as unknown as UseInfiniteQueryResult<
      InfiniteData<{ items: string[] }>,
      Error
    >;

    const screen = await render(
      <InfiniteProductGrid
        queryResult={queryResult}
        selectItems={(page) => page.items}
        renderItem={() => null}
        keyExtractor={(item) => item}
        listEmptyComponent={<Text>No vendor products</Text>}
      />,
    );

    expect(screen.getByText("No vendor products")).toBeTruthy();
  });

  it("renders the caller-provided error state when the query fails", async () => {
    const queryResult = {
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as UseInfiniteQueryResult<InfiniteData<unknown>, Error>;

    const screen = await render(
      <InfiniteProductGrid
        queryResult={queryResult}
        selectItems={() => []}
        renderItem={() => null}
        keyExtractor={() => "item"}
        listErrorComponent={<Text>Vendor list failed</Text>}
      />,
    );

    expect(screen.getByText("Vendor list failed")).toBeTruthy();
  });
});
