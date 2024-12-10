import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};
export const SliderData: ImageSliderType[] = [
  {
    title: "Slider 1",
    description: "Slider 1 Description",
    image: require("@/assets/sliders/slider-1.jpg"),
  },
  {
    title: "Slider 2",
    description: "Slider 2 Description",
    image: require("@/assets/sliders/slider-2.jpg"),
  },
  {
    title: "Slider 3",
    description: "Slider 3 Description",
    image: require("@/assets/sliders/slider-3.jpg"),
  },
  {
    title: "Slider 3",
    description: "Slider 3 Description",
    image: require("@/assets/sliders/slider-4.jpg"),
  },
  {
    title: "Slider 3",
    description: "Slider 3 Description",
    image: require("@/assets/sliders/slider-5.jpg"),
  },
];
