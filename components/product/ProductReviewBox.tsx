import { Animated, Image, Text, View } from "react-native";
import { randomUUID } from "expo-crypto";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { Colors } from "@/constants/Colors";
import ScrollView = Animated.ScrollView;

const ProductReviewBox = () => (
  <View className="px-4">
    <View id="reviews" className="flex-col gap-y-3 rounded-xl">
      <View className="flex-row items-center justify-between justify-items-center px-6">
        <Text className="text-xl font-semibold">Reviews</Text>
        <Text className="text-md">view more</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 11 }).map((item, index) => (
          <ProductReviewDetails key={randomUUID()} />
        ))}
      </ScrollView>
    </View>
  </View>
);

const ProductReviewDetails = () => (
  <View className="mr-4 w-52">
    <View
      id="review-detail"
      className="flex-col rounded-xl border border-gray-400 bg-white p-3"
    >
      <View
        id="product-slider"
        className="flex items-center justify-items-center"
      >
        <Image
          source={require("@/assets/products/product.png")}
          className="h-24 w-24 rounded-lg"
        />
      </View>
      <View
        id="product-reviewer"
        className="flex items-center justify-items-center"
      >
        <Text className="text-md font-semibold">Ayush P.</Text>
      </View>
      <View
        id="product-reviewer"
        className="flex items-center justify-items-center"
      >
        <View className="flex-row items-center justify-items-center gap-x-2">
          <StarIcon size="20" color={Colors.light.tint} />
          <StarIcon size="20" color={Colors.light.tint} />
          <StarIcon size="20" color={Colors.light.tint} />
          <StarIcon size="20" color={Colors.light.tint} />
        </View>
      </View>
      <View
        id="product-review-content"
        className="flex items-center justify-items-center"
      >
        <Text className="text-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
    </View>
  </View>
);

export default ProductReviewBox;
