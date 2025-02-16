import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import cn from "@/utils/tailwindHelper";
import MessageAction from "@/components/account/message/MessageAction";
import useMessageActionHook from "@/hooks/useMessageActionHook";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { actions } = useMessageActionHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Messages" />
      <ContentWrapper>
        <View className="flex-row justify-between p-4 shadow-2xl">
          {actions.map((action) => (
            <MessageAction key={action.id} action={action} />
          ))}
        </View>
        <ScrollView className="flex-1 bg-gray-200 px-2">
          <View className="py-2">
            <Text className="font-light">Last 7 days</Text>
          </View>
          <View className="flex-col gap-y-6 py-2.5">
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}

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
}: MessageBannerProps) => (
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
          height: 120,
          objectFit: "contain",
        }}
        source={imgUrl}
      />
    </View>
    <Text>{detail}</Text>
  </View>
);
