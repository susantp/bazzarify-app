import React, { useState } from "react";
import { Text, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export default PolygonFreeDelivery;
