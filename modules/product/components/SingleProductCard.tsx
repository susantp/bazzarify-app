import { Image, Text, View } from "react-native";
import getFirstImageSource from "@/modules/core/utils/getFirstImageSource";
import PolygonFreeDelivery from "@/modules/product/components/PolygonFreeDelivery";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export interface SingleProductCardProps {
  item: TOmittedProductWithImages | null;
}
const SingleProductCard = ({ item }: SingleProductCardProps) => {
  if (!item) return null;
  return (
    <Link
      href={{
        pathname: "/products/[uuid]",
        params: { uuid: item.uuid },
      }}
      style={{ flexBasis: "48%", margin: 4 }} // Approximate two columns with some margin
      className="flex-col justify-items-center rounded-lg border border-gray-300"
    >
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
          <ThemedText
            type="defaultSemiBold"
            lightColor="#0000"
            darkColor="#0000"
          >
            {item.name}
          </ThemedText>
        </View>
        <View className="flex flex-row">
          <Text className="text-3xl font-semibold text-primary">
            Rs {item?.base_price}
          </Text>
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
    </Link>
  );
};
export default SingleProductCard;
