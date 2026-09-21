import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStore } from "@/modules/vendor/data/services/vendorService";
import ThemedLoader from "@/modules/core/components/ThemedLoader";

interface VendorHeaderProps {
  vendorUuid?: string;
}

const VendorBanner = ({ vendorUuid }: VendorHeaderProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["vendor", vendorUuid, "store"],
    queryFn: () => fetchStore(vendorUuid as string),
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) {
    return <ThemedLoader />;
  }

  return (
    <>
      <ImageBackground
        style={{
          height: 150,
        }}
        className="flex justify-center bg-slate-600"
        imageStyle={{ opacity: 0.3 }}
        // source={{
        //   uri: vendor.bgImgPath,
        // }}
      >
        <View className="flex-row px-6">
          <View className="w-9/12 flex-row items-center gap-x-2">
            <View>
              {/*<Image*/}
              {/*  source={{ uri: vendor.logo }}*/}
              {/*  style={{ width: 40, height: 40 }}*/}
              {/*/>*/}
            </View>
            <View className="flex-col gap-y-1">
              <Text className="text-lg font-semibold text-white">
                {data?.store?.name || "N/A"}
              </Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-sm font-semibold text-primary">
                  100% Authentic
                </Text>
                <Ionicons
                  size={12}
                  name="shield-checkmark"
                  color={Colors.light.tint}
                />
              </View>
              <View className="flex-row items-center gap-x-1">
                <FontAwesome size={12} name="user" color="white" />
                <Text className="text-sm font-semibold text-white">xxk</Text>
              </View>
            </View>
          </View>
          <View className="w-3/12 flex-col gap-y-2">
            <TouchableOpacity className="items-center gap-x-1 rounded-md bg-primary py-1">
              <Text className="font-semibold text-white">Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-md bg-primary py-1">
              <Entypo name="chat" size={15} color="white" />
              <Text className="font-semibold text-white">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default VendorBanner;
