import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ItemProps } from "@/components";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import { Colors } from "@/constants/Colors";

export type ProductCardProps = {
  item: ItemProps;
  containerClasses?: string;
  cols: 2 | 3 | 4;
};
const ProductCard = ({ item, containerClasses, cols }: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(tabs)/products/[slug]",
          params: { slug: item.id },
        })
      }
      className={`flex w-${(12 / cols).toString()}/12 p-2`}
    >
      <View className="flex-col justify-items-center rounded-lg border border-gray-200">
        <View id="image-box">
          <View
            id="image-container"
            className="flex-row items-center justify-center"
          >
            <Image
              source={require("@/assets/products/product.png")}
              className="h-48 w-48 rounded-lg md:h-64 md:w-64"
            />
          </View>
          {item.freeDelivery && <PolygonFreeDelivery />}
        </View>

        <View id="content" className="flex-col items-start gap-y-2 p-2">
          <View>
            <Text className="text-md">
              {item.name.substring(0, 45).concat("...")}
            </Text>
          </View>
          <View className="flex flex-row">
            <View>
              <Text className="text-3xl font-semibold text-orange-600">
                Rs {item.price}
              </Text>
            </View>
          </View>
          <View className="flex-row px-1">
            <View className="w-5/12 flex-row items-center gap-x-1">
              <AntDesign name="star" size={16} color={`#f47d58`} />
              <Text className="text-md text-orange-600">{item.rating}</Text>
            </View>
            <View className="w-7/12 flex-row items-center justify-center gap-x-1">
              <FontAwesome name="map-marker" size={16} color={`#f47d58`} />
              <Text
                className="text-md text-slate-600"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;

const PolygonFreeDelivery = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  return (
    <View className="relative bottom-0 left-0 flex-row justify-start">
      <Svg
        width={dimension.width}
        height={dimension.height}
        className="absolute"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Polygon
          points={`
              0,0 
              ${dimension.width * 0.88},0 
              ${dimension.width},${dimension.height} 
              0,${dimension.height}
            `}
          fill={Colors.light.tint}
        />
      </Svg>
      <View
        className="w-10/12 flex-row items-center gap-x-2 rounded-tr-md px-2 py-1"
        onLayout={(e) => setDimension(e.nativeEvent.layout)}
      >
        <MaterialCommunityIcons
          name="truck-delivery"
          size={16}
          color={`#fff`}
        />
        <Text className="uppercase text-white">free delivery</Text>
      </View>
    </View>
  );
};
