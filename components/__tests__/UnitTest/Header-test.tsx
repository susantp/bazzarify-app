import { fireEvent, render } from "@testing-library/react-native";
import Header from "@/components/home/Header";

it("renders search input with placeholder", () => {
  const { getByPlaceholderText } = render(<Header classes="" />);

  expect(getByPlaceholderText("Search on Bazzarify")).toBeTruthy();
});

it("does not crash when search input is empty", () => {
  const { getByPlaceholderText } = render(<Header classes="" />);
  const input = getByPlaceholderText("Search on Bazzarify");
  fireEvent.changeText(input, "");
  expect(input.props.value).toBe("");
});
