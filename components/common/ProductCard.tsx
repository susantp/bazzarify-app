import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import PolygonFreeDelivery from "@/modules/product/components/PolygonFreeDelivery";
import { getProductInventorySummary } from "@/modules/product/utils/getProductInventorySummary";
import { Colors } from "@/constants/Colors";

export type ProductCardProps = {
  item: TOmittedProductWithImages | null;
  cols: 2 | 3 | 4;
};

function getCardWidth(cols: ProductCardProps["cols"]) {
  return `${100 / cols}%` as const;
}

const ProductCard = ({ item, cols }: ProductCardProps) => {
  if (!item) return null;
  const inventory = getProductInventorySummary(item);
  const inventoryTone =
    inventory.canPurchase === false
      ? styles.inventoryDanger
      : styles.inventoryInfo;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/products/[uuid]",
          params: { uuid: item.uuid },
        })
      }
      style={[styles.cardSlot, { width: getCardWidth(cols) }]}
    >
      <View
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
        style={{ opacity: inventory.canPurchase === false ? 0.7 : 1 }}
      >
        <View className="bg-slate-50 p-3">
          <View
            id="image-container"
            className="items-center justify-center overflow-hidden rounded-2xl bg-white"
            style={styles.imageFrame}
          >
            <Image
              source={getFirstImageSource({
                images: item.images,
                baseUrl: item.image_base_url,
              })}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          {"freeDelivery" in item && <PolygonFreeDelivery />}
        </View>

        <View id="content" className="gap-y-2 px-3 pb-3 pt-1">
          <View style={styles.nameBlock}>
            <Text numberOfLines={2} className="text-sm font-medium text-slate-900">
              {item.name}
            </Text>
          </View>
          <View className="flex-row items-end">
            {"base_price" in item && (
              <View>
                <Text className="text-xl font-semibold text-primary">
                  Rs {item?.base_price}
                </Text>
              </View>
            )}
          </View>
          {inventory.message ? (
            <Text
              className="self-start rounded-full px-2.5 py-1 text-xs font-medium"
              style={inventoryTone}
            >
              {inventory.message}
            </Text>
          ) : null}
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

const styles = StyleSheet.create({
  cardSlot: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  imageFrame: {
    aspectRatio: 1,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  nameBlock: {
    minHeight: 40,
  },
  inventoryInfo: {
    backgroundColor: "#FFF1EB",
    color: Colors.light.tint,
  },
  inventoryDanger: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
  },
});

export default React.memo(ProductCard);
