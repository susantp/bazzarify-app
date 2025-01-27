import NormalHeader from "@/components/common/NormalHeader";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import React from "react";

interface VendorHeaderProps {
  canGoBack: boolean;
  vendor: VendorDataType;
}

type VendorDataType = {
  id: string;
  bgImgPath: string;
  name: string;
  logo: string;
  followers: string;
};

export const vendorData: VendorDataType = {
  id: "ultima",
  followers: "17.8k",
  name: "Ultima Lifestyle",
  logo: "https://s3-alpha-sig.figma.com/img/ae80/6a4e/1d7837413a6a0904cc0131bf6cef3748?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GxCdF9CI9lp-uOI2GJzbXE0GbOSYfqqxfpYrwsh4Euk6SYQtEvO9K7FSSA68yhhzLtwu2rSVXDE22~vLS0enLU2nlQX8K4G54XinJitCxazccOYKQjHGeSbgVzuZLjVu~EVde1hm9ep00OfKTvvNCQAnSy-YsZIlU4W1GqVrw53ajjHLgMbePlW-gq7~SWKLZhDJAJ29t3aPq98KEFHgOgJZ7XBs5drenZYjP12AGpT252igA-XOiTmXy6BWf7DTMzIZ231oBE3UgkkieTpUj~5kx1JYPVaevySvADyuNbMv71A2jGYlR07mDHFbOL4u40K0IwFfWPlNue-SJM~jNw__",
  bgImgPath:
    "https://lh3.googleusercontent.com/pw/AP1GczPpYF3_nl945SomGeJhAvSQCg4sjrRSAgCjXW4WoAYEsoNnbfB7vdeDYatFPozUgWf3eQ_FLPntC49CN7_f8K9cS7210vTyhNkMA50vXWdjotRFpaxG=w780-h258-no",
};
const VendorHeader = ({ canGoBack, vendor }: VendorHeaderProps) => {
  return (
    <>
      <NormalHeader
        canGoBack={canGoBack}
        searchPlaceHolder={`search on ${vendor.name}`}
      />
      <ImageBackground
        style={{
          height: 150,
        }}
        className="flex justify-center bg-black"
        imageStyle={{ opacity: 0.3 }}
        source={{
          uri: vendor.bgImgPath,
        }}
      >
        <View className="flex-row px-6">
          <View className="w-9/12 flex-row items-center gap-x-2">
            <View>
              <Image
                source={{ uri: vendor.logo }}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View className="flex-col gap-y-1">
              <Text className="text-lg font-semibold text-white">
                {vendor.name}
              </Text>
              <View className="flex-row items-center gap-x-1">
                <Text className="text-sm font-semibold text-orange-600">
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
                <Text className="text-sm font-semibold text-white">
                  {vendor.followers}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-3/12 flex-col gap-y-2">
            <TouchableOpacity className="items-center gap-x-1 rounded-md bg-orange-600 py-1">
              <Text className="font-semibold text-white">Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-center gap-x-1 rounded-md bg-orange-600 py-1">
              <Entypo name="chat" size={15} color="white" />
              <Text className="font-semibold text-white">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default VendorHeader;
