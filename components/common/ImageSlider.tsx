import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { ImageSliderType } from "@/constants/SliderData";

const { width } = Dimensions.get("window");

interface ImageSliderProps {
  images: ImageSliderType[];
  autoplayInterval?: number;
  type?: "banner" | "thumbnail" | "gallery" | "product";
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoplayInterval = 3000,
  type = "banner",
}) => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const styleSet = getStylesForType(type);
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
    <View style={styleSet.wrapper}>
      <PagerView
        style={styleSet.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View key={index} style={styleSet.page}>
            <Image
              // source={{ uri: "https://placehold.co/400/png" }}
              source={image.image}
              style={styleSet.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};
const getStylesForType = (type: string) => {
  switch (type) {
    case "banner":
      return bannerStyles;
    case "product":
      return productStyles;
    // add new styles later
    default:
      return bannerStyles;
  }
};

// Banner style
const bannerStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width,
    height: width / 2.7, // square, most product sliders do this
  },
  pagerView: {
    width,
    height: width / 2.7,
  },
  page: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height: width / 2.9,
  },
});
// Product style
const productStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width,
    height: width / 0.999, // square, most product sliders do this
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSlider;
