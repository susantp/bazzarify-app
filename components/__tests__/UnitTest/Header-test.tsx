import { fireEvent, render } from "@testing-library/react-native";
import TopBar from "@/components/home/TopBar";

it("renders search input with placeholder", () => {
  const { getByPlaceholderText } = render(<TopBar className="" />);

  expect(getByPlaceholderText("Search on Bazzarify")).toBeTruthy();
});

it("does not crash when search input is empty", () => {
  const { getByPlaceholderText } = render(<TopBar className="" />);
  const input = getByPlaceholderText("Search on Bazzarify");
  fireEvent.changeText(input, "");
  expect(input.props.value).toBe("");
});
