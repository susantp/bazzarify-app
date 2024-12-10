import { FlatList, ListRenderItemInfo } from "react-native";
import { ImageSliderType } from "@/constants/SliderData";
import SliderItem from "@/components/home/SliderItem";

type Props = {
  itemList: ImageSliderType[];
};
const Slider = ({ itemList }: Props) => {
  return (
    <FlatList
      data={itemList}
      renderItem={({ item, index }: ListRenderItemInfo<ImageSliderType>) => (
        <SliderItem
          classes="flex items-center justify-center  bg-white"
          item={item}
          index={index}
        />
      )}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default Slider;
