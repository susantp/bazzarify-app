import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const ProductPageBottomView = () => {
  const [leftBtnDimension, setLeftButtonDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [rightBtnDimension, setRightButtonDimensions] = useState({
    width: 0,
    height: 0,
  });
  return (
    <>
      <View className="w-full flex-row justify-center">
        <Text>512+ sold in last month</Text>
      </View>
      <View className="flex-row">
        <View className="w-3/12 flex-row justify-between pl-1">
          <TouchableOpacity
            className="flex-col items-center"
            onPress={() => router.push("/vendor/demoVendor")}
          >
            <FontAwesome5 name="apple-alt" color="black" size={24} />
            <Text>Store</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center">
            <Octicons name="dependabot" color="black" size={24} />
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
        <View className="w-9/12 flex-row justify-end">
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            className="flex items-center justify-center px-8"
            onLayout={(e) => setLeftButtonDimensions(e.nativeEvent.layout)}
          >
            <Svg
              width={leftBtnDimension.width}
              height={leftBtnDimension.height}
              className="absolute"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <Polygon
                points={`
                0,0 
                ${leftBtnDimension.width},0 
                ${leftBtnDimension.width * 0.88},${leftBtnDimension.height} 
                0,${leftBtnDimension.height}
              `}
                fill="#1A202C"
              />
            </Svg>
            <Text className="font-bold text-white">Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/cart/checkout")}
            className="flex items-center justify-center px-8"
            onLayout={(e) => setRightButtonDimensions(e.nativeEvent.layout)}
          >
            <Svg
              width={rightBtnDimension.width}
              height={rightBtnDimension.height}
              className="absolute"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <Polygon
                points={`
                ${rightBtnDimension.width * 0.12},0 
                ${rightBtnDimension.width},0 
                ${rightBtnDimension.width},${rightBtnDimension.height} 
                0,${rightBtnDimension.height}
              `}
                fill={Colors.light.tint} // Tailwind Blue-900
              />
            </Svg>
            <Text className="font-bold text-white">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProductPageBottomView;
