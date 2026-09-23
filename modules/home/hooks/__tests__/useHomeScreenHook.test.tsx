import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import useHomeScreenHook from "@/modules/home/hooks/useHomeScreenHook";

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ removeQueries: jest.fn() }),
  useQueries: () => [
    { isRefetching: false, isLoading: false },
    { isRefetching: false, data: { flashDeals: { data: [] } } },
    { isRefetching: false, data: { popularProducts: { data: [] } } },
    { isRefetching: false, isLoading: true },
  ],
  useInfiniteQuery: () => ({ isRefetching: false }),
}));

jest.mock("@/modules/product/services/homeService", () => ({
  getFlashDealProducts: jest.fn(),
  getPopularProducts: jest.fn(),
  getHomeCategories: jest.fn(),
  getJustForYouProducts: jest.fn(),
}));
jest.mock(
  "@/modules/marketing/sliders/domain/services/marketingService",
  () => ({
    getHomeSliders: jest.fn(),
  }),
);

jest.mock("@/components/common/ImageSlider", () => () => null);
jest.mock("@/components/home/cards/FlashDealCard", () => () => null);
jest.mock("@/components/home/cards/PopularItems", () => () => null);
jest.mock("@/components/home/cards/JustForYou", () => () => null);
jest.mock("@/components/home/cards/HomeCategories", () => () => null);

function HomeHookHarness() {
  const { CARDS } = useHomeScreenHook();

  return <>{CARDS[0].component}</>;
}

describe("useHomeScreenHook", () => {
  it("keeps the loading card in the owned text boundary", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <HomeHookHarness />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Loading")).toBeTruthy();
  });
});
