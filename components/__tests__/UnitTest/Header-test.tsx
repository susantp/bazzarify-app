import { fireEvent, render } from "@testing-library/react-native";
import TopBar from "@/components/home/TopBar";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
    canGoBack: jest.fn(() => false),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

it("renders search input with placeholder", async () => {
  const { getByText } = await render(<TopBar className="" />);

  expect(getByText("Search on")).toBeTruthy();
});

it("renders the search action without crashing", async () => {
  const { getByRole } = await render(<TopBar className="" />);

  expect(getByRole("button", { name: "Search" })).toBeTruthy();
  fireEvent.press(getByRole("button", { name: "Search" }));
});
