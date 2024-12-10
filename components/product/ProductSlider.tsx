import { Image, TouchableOpacity, View } from "react-native";
import { HeartIcon, ShareIcon } from "react-native-heroicons/outline";
import React from "react";

const ProductSlider = () => (
  <>
    <View
      id="product-slider"
      className="flex items-center justify-items-center"
    >
      <Image
        source={require("@/assets/products/product.png")}
        className="h-64 w-64 rounded-lg"
      />
    </View>
    <View
      id="actions"
      className="flex-row justify-between justify-items-center"
    >
      <TouchableOpacity className="rounded-full bg-slate-200 p-1.5 shadow-sm">
        <HeartIcon color="black" strokeWidth={2} size={28} />
      </TouchableOpacity>
      <TouchableOpacity className="rounded-full bg-slate-200 p-1.5 shadow-sm">
        <ShareIcon size={28} strokeWidth={2} color="black" />
      </TouchableOpacity>
    </View>
  </>
);

export default ProductSlider;
