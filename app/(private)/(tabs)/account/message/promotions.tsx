import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import { MessageFeed } from "@/components/account/message/MessageFeed";
import { promotionMessages } from "@/components/account/message/messageFeedData";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Promotions" />
      <ContentWrapper>
        <MessageFeed
          testID="promotion-feed"
          items={promotionMessages}
          type="promo"
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
