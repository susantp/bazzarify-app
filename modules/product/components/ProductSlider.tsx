import { TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import ImageSlider from "@/components/common/ImageSlider";
import constructProductImagesUrl from "@/modules/product/utils/constructImageUrl";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";

export interface IProductSliderProps {
  item: TProductWithVariantAndImage;
}

const ProductSlider = ({ item }: IProductSliderProps) => {
  let images = constructProductImagesUrl(item);
  if (!images || images.length === 0)
    images = [
      {
        title: "default",
        description: "default",
        image: { uri: require("@/assets/products/product.png") },
      },
    ];
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
