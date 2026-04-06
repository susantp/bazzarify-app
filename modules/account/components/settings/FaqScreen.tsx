import { useState } from "react";
import { FaqList } from "@/modules/account/data/settings/faqList";
import { Pressable, Text, View } from "react-native";
import ContentWrapper from "@/components/common/ContentWrapper";
import { Ionicons } from "@expo/vector-icons";

const FaqScreen = () => {
  const [list, setList] = useState(FaqList);
  const handlePress = (id: string) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };
  return (
    <ContentWrapper className="gap-y-2 bg-white p-2">
      {list.map((item) => (
        <View
          key={item.id}
          className="flex-col justify-center gap-y-2 rounded-xl border border-gray-400 p-3"
        >
          <Pressable
            onPress={() => handlePress(item.id)}
            className="flex-row items-center justify-between"
          >
            <Text className="text-md">{item.question}</Text>
            {item.active ? (
              <Ionicons name="chevron-down" size={20} color="black" />
            ) : (
              <Ionicons name="chevron-back" size={20} color="black" />
            )}
          </Pressable>
          <View className={item.active ? undefined : "h-0"}>
            <Text className="text-sm">{item.answer}</Text>
          </View>
        </View>
      ))}
    </ContentWrapper>
  );
};
export default FaqScreen;
