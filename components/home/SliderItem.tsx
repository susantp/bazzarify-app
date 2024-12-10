import { Dimensions, Image, View } from "react-native";
import { ImageSliderType } from "@/constants/SliderData";

type SliderItemProps = {
  item: ImageSliderType;
  index: number;
  classes: string;
};

const SliderItem = ({ item, classes }: SliderItemProps) => {
  const { width } = Dimensions.get("screen");
  return (
    <View className={classes} style={{ width }}>
      <Image className="w-full" source={item.image} />
    </View>
  );
};
export default SliderItem;
