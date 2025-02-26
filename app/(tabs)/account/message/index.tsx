import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import { ScrollView, Text, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import MessageAction from "@/components/account/message/MessageAction";
import useMessageActionHook from "@/hooks/useMessageActionHook";
import MessageBanner from "@/components/account/message/MessageBanner";

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
