import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import { ScrollView, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import MessageBanner from "@/components/account/message/MessageBanner";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Activities" />
      <ContentWrapper>
        <ScrollView className="flex-1 bg-gray-200 px-2">
          <View className="flex-col gap-y-6 py-2.5">
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
            <MessageBanner
              type="activity"
              time="05:10 PM"
              title="2.2 flash sale, get special discount"
              detail="Up to 70% off, just in time for 2.2 flash deals! ⚡⚡"
              imgUrl={require("@/assets/images/banners/activity-deal.png")}
            />
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
