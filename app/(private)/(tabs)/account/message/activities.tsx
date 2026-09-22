import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import { MessageFeed } from "@/components/account/message/MessageFeed";
import { activityMessages } from "@/components/account/message/messageFeedData";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Activities" />
      <ContentWrapper>
        <MessageFeed
          testID="activity-feed"
          items={activityMessages}
          type="activity"
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
