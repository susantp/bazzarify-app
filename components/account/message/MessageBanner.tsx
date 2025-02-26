import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import cn from "@/utils/tailwindHelper";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";

interface MessageBannerProps {
  time: string;
  title: string;
  detail: string;
  imgUrl: ImageSourcePropType;
  type: "promo" | "activity";
}

const MessageBanner = ({
  detail,
  title,
  time,
  imgUrl,
  type,
}: MessageBannerProps) => {
  const { height } = Dimensions.get("window");
  return (
    <View
      className="flex-col gap-y-2 rounded-lg border border-slate-300 bg-white p-2"
      id="banner"
    >
      <View className="flex-row items-center justify-items-center gap-x-2">
        <View
          className={cn(
            "rounded-full",
            "p-2",
            type === "promo" && "bg-pink-500",
            type === "activity" && "bg-amber-500",
          )}
        >
          {type === "promo" && (
            <Ionicons name="megaphone" size={18} color={"#fff"} />
          )}
          {type === "activity" && (
            <Feather name="activity" size={18} color={"#fff"} />
          )}
        </View>
        <View className="flex-col gap-y-1">
          <Text>{title}</Text>
          <Text className="text-gray-500">{time}</Text>
        </View>
      </View>
      <View className="flex items-center">
        <Image
          style={{
            height: height * (120 / height),
            objectFit: "contain",
          }}
          source={imgUrl}
        />
      </View>
      <Text>{detail}</Text>
    </View>
  );
};

export default MessageBanner;
