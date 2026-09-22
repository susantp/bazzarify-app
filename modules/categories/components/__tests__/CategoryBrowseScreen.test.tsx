import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CategoryBrowseScreen from "@/modules/categories/components/CategoryBrowseScreen";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    canGoBack: jest.fn(() => true),
    push: jest.fn(),
    back: jest.fn(),
    dismissTo: jest.fn(),
  },
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: {
      browse: {
        path: [{ name: "Shoes" }],
        child_categories: [
          {
            uuid: "boots",
            name: "Boots",
            slug: "boots",
            image_base_path: "",
            image_base_url: "",
            icon_base_path: "",
            icon_base_url: "",
            images: [],
          },
        ],
        products: { data: [], next_page_url: null },
      },
    },
    isLoading: false,
  }),
}));

jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));

jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/modules/categories/components/ChildCategoryHorizontal", () => ({
  __esModule: true,
  default: ({
    item,
    onPress,
  }: {
    item: { name: string };
    onPress: () => void;
  }) => {
    const { Pressable, Text } = jest.requireActual("react-native");

    return (
      <Pressable accessibilityLabel={item.name} onPress={onPress}>
        <Text>{item.name}</Text>
      </Pressable>
    );
  },
}));

jest.mock("@/modules/product/components/SingleProductCard", () => ({
  __esModule: true,
  default: () => null,
}));

describe("CategoryBrowseScreen", () => {
  it("keeps category refinement data-driven and routes to the next level", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CategoryBrowseScreen
          level="child"
          slug="shoes"
          params={{ child: "shoes" }}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Categories / Shoes")).toBeTruthy();
    expect(screen.getByText("Refine by category")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Boots"));
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/categories/[child]/[subchild]",
      params: { child: "shoes", subchild: "boots" },
    });
  });
});
