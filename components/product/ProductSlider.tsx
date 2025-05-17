import { TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { ItemProps } from "@/components";
import ImageSlider from "@/components/common/ImageSlider";
import { ImageSliderType } from "@/constants/SliderData";

export interface IProductSliderProps {
  item: ItemProps;
}

const ProductSlider = ({ item }: IProductSliderProps) => {
  const images: ImageSliderType[] | undefined = item.images?.map((img) => ({
    title: "",
    image: { uri: img.s3_path_url },
    description: "",
  }));
  if (!images || images.length === 0) return null;
  return (
    <>
      <View
        id="product-slider"
        className="flex items-center justify-items-center"
      >
        <ImageSlider images={images} autoplayInterval={5000} />
      </View>
      <View
        id="actions"
        className="flex-row justify-between justify-items-center px-4"
      >
        <TouchableOpacity className="rounded-full bg-orange-100 p-2 shadow-sm">
          <AntDesign color="black" name="hearto" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-orange-100 p-2 shadow-sm">
          <SimpleLineIcons name="share-alt" size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductSlider;
