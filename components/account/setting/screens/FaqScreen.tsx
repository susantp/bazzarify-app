import { useState } from "react";
import { FaqList } from "@/components/account/setting/data/faqList";
import { Pressable, Text, View } from "react-native";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";

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
    <View className="h-screen-safe flex-col gap-y-2 bg-white p-2">
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
              <ChevronDownIcon size={20} strokeWidth={1} color="black" />
            ) : (
              <ChevronLeftIcon size={20} strokeWidth={1} color="black" />
            )}
          </Pressable>
          <View className={item.active ? undefined : "h-0"}>
            <Text className="text-sm">{item.answer}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default FaqScreen;
