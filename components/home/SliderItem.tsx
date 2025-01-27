import { Dimensions, Image, View } from "react-native";
import { ImageSliderType } from "@/constants/SliderData";

type SliderItemProps = {
  item: ImageSliderType;
  index: number;
  className: string;
};

const SliderItem = ({ item, className }: SliderItemProps) => {
  const { width } = Dimensions.get("screen");
  return (
    <View className={className} style={{ width }}>
      <Image className="w-full" source={item.image} />
    </View>
  );
};
export default SliderItem;
