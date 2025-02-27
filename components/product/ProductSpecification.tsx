import { Text, View } from "react-native";
import { randomUUID } from "expo-crypto";
import React from "react";

const ProductSpecification = () => {
  const specifications = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <View className="p-4">
      <View
        id="voucher-info"
        className="flex-col gap-y-3 rounded-xl border border-gray-400 px-3 py-2"
      >
        <Text className="text-xl font-semibold">Specification</Text>
        <View className="flex-col gap-y-2">
          {specifications.map((spec, i) => (
            <View key={randomUUID()} className="flex-row justify-between p-2">
              <Text>
                specification {i}: info {i}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default ProductSpecification;
