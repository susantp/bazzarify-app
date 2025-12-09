import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import PolygonFreeDelivery from "@/modules/product/components/PolygonFreeDelivery";

export type ProductCardProps = {
  item: TOmittedProductWithImages | null;
  cols: 2 | 3 | 4;
};
const ProductCard = ({ item, cols }: ProductCardProps) => {
  if (!item) return null;
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/products/[uuid]",
          params: { uuid: item.uuid },
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
              source={getFirstImageSource({
                images: item.images,
                baseUrl: item.image_base_url,
              })}
              className="h-48 w-48 rounded-lg md:h-64 md:w-64"
            />
          </View>
          {"freeDelivery" in item && <PolygonFreeDelivery />}
        </View>

        <View id="content" className="flex-col items-start gap-y-2 p-2">
          <View>
            <Text className="text-md">
              {item.name.substring(0, 20).concat("...")}
            </Text>
          </View>
          <View className="flex flex-row">
            {"base_price" in item && (
              <View>
                <Text className="text-3xl font-semibold text-primary">
                  Rs {item?.base_price}
                </Text>
              </View>
            )}
          </View>
          {/*<View className="flex-row px-1">*/}
          {/*  {"rating" in item && (*/}
          {/*    <View className="w-5/12 flex-row items-center gap-x-1">*/}
          {/*      <AntDesign name="star" size={16} color={`#f47d58`} />*/}
          {/*      <Text className="text-md text-primary">{item?.rating}</Text>*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*  {"location" in item && (*/}
          {/*    <View className="w-7/12 flex-row items-center justify-center gap-x-1">*/}
          {/*      <FontAwesome name="map-marker" size={16} color={`#f47d58`} />*/}
          {/*      <Text*/}
          {/*        className="text-md text-slate-600"*/}
          {/*        numberOfLines={1}*/}
          {/*        ellipsizeMode="tail"*/}
          {/*      >*/}
          {/*        {item?.location}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  )}*/}
          {/*</View>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ProductCard);
