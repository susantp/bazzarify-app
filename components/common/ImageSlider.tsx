import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { ImageSliderType } from "@/constants/SliderData";

const { width } = Dimensions.get("window");

interface ImageSliderProps {
  images: ImageSliderType[];
  autoplayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoplayInterval = 3000,
}) => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    let intervalId: number;

    const autoScroll = () => {
      const nextIndex = (currentPage + 1) % images.length;
      if (pagerRef.current) {
        pagerRef.current.setPage(nextIndex);
        setCurrentPage(nextIndex);
      }
    };

    intervalId = setInterval(autoScroll, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [currentPage, images, autoplayInterval]);

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      ref={pagerRef}
      onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
    >
      {images.map((image, index) => (
        <View key={index} style={styles.page}>
          <Image source={image.image} style={styles.image} resizeMode="cover" />
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    width,
    height: width / 2.7,
  },
  page: {
    width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height: width / 2.9,
  },
});

export default ImageSlider;
