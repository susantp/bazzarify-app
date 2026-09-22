import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { ChatList } from "@/components/account/message/ChatList";
import { chatList } from "@/components/account/message/chatListData";
import { PageContent } from "@/components/design-system";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Chats" />
      <PageContent>
        <ChatList testID="chat-list" items={chatList} />
      </PageContent>
    </SafeAreaWrapper>
  );
}
