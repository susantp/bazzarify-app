import React from "react";
import { Image, StyleSheet } from "react-native";
import { ImageSliderType } from "@/constants/SliderData";
import { Carousel } from "@/components/design-system/media";

interface ImageSliderProps {
  images: ImageSliderType[];
  autoplayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoplayInterval = 3000,
}) => {
  return (
    <Carousel
      data={images}
      height={200}
      autoplayInterval={autoplayInterval}
      keyExtractor={(image, index) => `${image.title}-${index}`}
      renderItem={({ item }) => (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

export default ImageSlider;
