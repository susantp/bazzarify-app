import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import React from "react";
import MessageAction from "@/components/account/message/MessageAction";
import useMessageActionHook from "@/hooks/useMessageActionHook";
import { Box, PageContent, Text } from "@/components/design-system";
import { MessageTimeline } from "@/components/account/message/MessageTimeline";
import { messageTimeline } from "@/components/account/message/messageTimelineData";

export default function Page() {
  const { actions } = useMessageActionHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Messages" />
      <PageContent>
        <Box
          direction="row"
          justify="space-between"
          padding="lg"
          style={{ elevation: 2 }}
        >
          {actions.map((action) => (
            <MessageAction key={action.id} action={action} />
          ))}
        </Box>
        <Box paddingX="sm" paddingY="sm">
          <Text variant="caption" color="textMuted">
            Last 7 days
          </Text>
        </Box>
        <MessageTimeline testID="message-timeline" items={messageTimeline} />
      </PageContent>
    </SafeAreaWrapper>
  );
}
