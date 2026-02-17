import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const chatList = [
    {
      id: "dell",
      body: "sir dell Vostro series available?",
      title: "Dell",
      iconPath: require("@/assets/images/chats/dellIcon.png"),
    },
    {
      id: "apple",
      body: "sir iphone 16 available in 1 tB?",
      title: "Apple",
      iconPath: require("@/assets/images/chats/appleIcon.png"),
    },
  ];
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Chats" />
      <ContentWrapper>
        <View className="flex-col gap-y-4 px-2">
          {chatList.map((chat) => (
            <TouchableOpacity
              activeOpacity={0.4}
              className="flex-row items-center gap-x-4 border-b border-b-slate-300 py-2.5"
              key={chat.id}
            >
              <View>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={chat.iconPath}
                />
              </View>
              <View className="flex-col">
                <Text>{chat.title}</Text>
                <Text className="font-light text-slate-600">{chat.body}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
