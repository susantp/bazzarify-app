import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

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
      className="flex-row justify-between justify-items-center px-4"
    >
      <TouchableOpacity className="rounded-full bg-orange-100 p-2 shadow-sm">
        <AntDesign color="black" name="hearto" size={24} />
      </TouchableOpacity>
      <TouchableOpacity className="rounded-full bg-orange-100 p-2 shadow-sm">
        <SimpleLineIcons name="share-alt" size={24} />
      </TouchableOpacity>
    </View>
  </>
);

export default ProductSlider;
