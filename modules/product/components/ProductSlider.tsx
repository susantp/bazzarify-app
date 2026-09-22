import { Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import constructProductImagesUrl from "@/modules/product/utils/constructImageUrl";
import { TProductWithVariantAndImage } from "@/modules/product/schemas/ProductWithVariantAndImageSchema";
import ImageSlider from "@/components/common/ImageSlider";
import { Box, Icon } from "@/components/design-system";

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
    <Box style={{ position: "relative", overflow: "visible" }}>
      <Box id="product-slider" align="center">
        <ImageSlider type="product" images={images} autoplayInterval={5000} />
      </Box>

      <Box
        id="actions"
        direction="row"
        justify="space-between"
        paddingX="lg"
        paddingY="sm"
        style={{
          bottom: 0,
          left: 0,
          opacity: 0.9,
          position: "absolute",
          right: 0,
        }}
      >
        <Pressable
          accessibilityLabel={
            isFav ? "Remove from favorites" : "Add to favorites"
          }
          accessibilityRole="button"
          testID="product-favorite"
          onPress={() => setIsFav(!isFav)}
        >
          <Box backgroundColor="surface" borderRadius="pill" padding="sm">
            <Icon size={40} color="primary">
              {({ color, size }) => (
                <Entypo
                  color={color}
                  name={isFav ? "heart" : "heart-outlined"}
                  size={size}
                />
              )}
            </Icon>
          </Box>
        </Pressable>

        <Pressable
          accessibilityLabel="Share product"
          accessibilityRole="button"
        >
          <Box backgroundColor="surface" borderRadius="pill" padding="sm">
            <Icon size={40} color="primary">
              {({ color, size }) => (
                <AntDesign name="share-alt" size={size} color={color} />
              )}
            </Icon>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
};

export default ProductSlider;
