import { ItemProps } from "@/components";
import { Text, View } from "react-native";
import { ShieldCheckIcon, StarIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import { StarIcon as StartIconOutline } from "react-native-heroicons/outline";
import React from "react";
import Svg, { Path } from "react-native-svg";

const DiscountBannerIcon = () => (
  <Svg width="51" height="32" viewBox="0 0 51 32" fill="none">
    <Path
      d="M26.5225 2.25468V4.95151C26.5225 5.25266 26.7632 5.49858 27.0643 5.50498L50.1322 5.99579C50.4612 6.00279 50.5254 5.53227 50.2065 5.45085L29.2847 0.109111C27.8844 -0.248406 26.5225 0.809484 26.5225 2.25468Z"
      fill="#A73C09"
    />
    <Path
      d="M3.27146 5.49347H31.2282H50.3273C50.6331 5.49347 50.8809 5.74132 50.8809 6.04707V27.3606C50.8809 29.8066 48.8981 31.7894 46.4522 31.7894H31.2282H3.68666C1.92863 31.7894 0.503471 30.3642 0.503471 28.6062C0.503471 26.8482 1.92863 25.423 3.68666 25.423H6.31626C7.6921 25.423 8.80745 24.3077 8.80745 22.9318C8.80745 21.556 7.69211 20.4406 6.31626 20.4406H5.34746C4.04805 20.4406 2.99466 19.3873 2.99466 18.0878C2.99466 16.7884 4.04805 15.735 5.34746 15.735H6.45466C7.75407 15.735 8.80745 14.6817 8.80745 13.3823C8.80745 12.0828 7.75407 11.0295 6.45466 11.0295H3.27146C1.74274 11.0295 0.503471 9.79018 0.503471 8.26146C0.503471 6.73274 1.74274 5.49347 3.27146 5.49347Z"
      fill="#F75405"
    />
  </Svg>
);
const ProductGenericDetails = ({ item }: { item: ItemProps }) => (
  <View className="px-4">
    <View id="product-title" className="py-2">
      <Text className="text-2xl">{item.name}</Text>
    </View>

    <View id="rating-info" className="flex-row justify-between">
      <View id="reviews" className="flex-row gap-x-1">
        <StarIcon size={20} strokeWidth={1} color={Colors["light"].tint} />
        <StarIcon size={20} strokeWidth={1} color={Colors["light"].tint} />
        <StarIcon size={20} strokeWidth={1} color={Colors["light"].tint} />
        <StarIcon size={20} strokeWidth={1} color={Colors["light"].tint} />
        <StartIconOutline
          size={20}
          strokeWidth={1}
          color={Colors["light"].tint}
        />
        <Text>512</Text>
      </View>

      <View
        id="authenticity"
        className="flex-row items-center justify-items-center gap-x-2"
      >
        <Text className="text-md font-semibold text-orange-900">
          100% Authentic
        </Text>
        <ShieldCheckIcon
          color={Colors["light"].tint}
          strokeWidth={1}
          size={23}
        />
      </View>
    </View>

    <View
      id="price-info"
      className="flex-col gap-y-2 rounded-xl border border-gray-400 px-3 py-2"
    >
      <View className="flex-row items-center justify-between">
        <View id="price" className="flex-row items-end gap-x-3">
          <Text className="text-md text-2xl font-bold text-orange-600">
            Rs. 1,599
          </Text>
          <Text className="text-sm text-gray-600 line-through">Rs. 3,499</Text>
        </View>

        <View id="discount" className="relative flex items-center">
          <DiscountBannerIcon />
          <Text className="absolute inset-x-2.5 inset-y-2.5 flex items-center pl-3 text-sm text-white">
            -8%
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-gray-500">
          you're saving upto rs. 2,000 don't miss it
        </Text>
      </View>
      <View className="border border-gray-400"></View>
      <View>
        <Text className="text-xl font-semibold">Color: Black</Text>
      </View>
      <View className="flex-row items-center justify-items-center gap-x-2">
        <View className="h-10 w-10 rounded-full border-2 border-orange-600 p-0.5">
          <View className="h-full w-full rounded-full bg-black"></View>
        </View>
        <View className="h-8 w-8 rounded-full">
          <View className="h-full w-full rounded-full bg-gray-500"></View>
        </View>
        <View className="h-8 w-8 rounded-full">
          <View className="h-full w-full rounded-full bg-blue-800"></View>
        </View>
      </View>
      <View className="border border-gray-400"></View>
      <View>
        <Text className="text-gray-500">
          Get extra discount with coupon on shopping
        </Text>
      </View>
    </View>
  </View>
);

export default ProductGenericDetails;
