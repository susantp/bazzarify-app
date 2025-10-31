import { Pressable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import constructProductImagesUrl from "@/modules/product/utils/constructImageUrl";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import { Card } from "react-native-paper";
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
    <Card>
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
        <Pressable
          className="rounded-full bg-orange-100 p-2 shadow-sm"
          onPress={() => setIsFav(!isFav)}
        >
          <Entypo
            color={Colors.light.tint}
            name={isFav ? `heart` : `heart-outlined`}
            size={40}
          />
        </Pressable>
        <TouchableOpacity className="rounded-full bg-orange-100 p-2 shadow-sm">
          <AntDesign name="share-alt" size={40} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default ProductSlider;
