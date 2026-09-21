import { Pressable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import constructProductImagesUrl from "@/modules/product/utils/constructImageUrl";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { Colors } from "@/constants/Colors";
import ImageSlider from "@/components/common/ImageSlider";

export interface IProductSliderProps {
  item: TProductWithVariantAndImage;
}

const ProductSlider = ({ item }: IProductSliderProps) => {
  let images = constructProductImagesUrl(item);
  const [isFav, setIsFav] = useState(false);
  if (!images || images.length === 0)
    images = [
      {
        title: "default",
        description: "default",
        image: { uri: "https://picsum.photos/700" },
      },
    ];
  return (
    <View className="relative overflow-visible">
      <View
        id="product-slider"
        className="flex items-center justify-items-center"
      >
        <ImageSlider type="product" images={images} autoplayInterval={5000} />
      </View>

      <View
        id="actions"
        className="w-full flex-row justify-between rounded-lg px-4 py-2 opacity-90"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <Pressable
          className="rounded-full p-2 shadow-sm"
          onPress={() => setIsFav(!isFav)}
        >
          <Entypo
            color={Colors.light.tint}
            name={isFav ? `heart` : `heart-outlined`}
            size={40}
          />
        </Pressable>

        <TouchableOpacity className="rounded-full p-2 shadow-sm">
          <AntDesign name="share-alt" size={40} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductSlider;
