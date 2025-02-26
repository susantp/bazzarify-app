import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import { ScrollView, View } from "react-native";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import MessageBanner from "@/components/account/message/MessageBanner";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Promotions" />
      <ContentWrapper>
        <ScrollView className="flex-1 bg-gray-200 px-2">
          <View className="flex-col gap-y-6 py-2.5">
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
            />
            <MessageBanner
              type="promo"
              time="05:10 PM"
              title="💘 Fancyra’s valentine deals!"
              detail="Upto 70% off, just in time for valentine's"
              imgUrl={require("@/assets/images/banners/promo-deal.png")}
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
