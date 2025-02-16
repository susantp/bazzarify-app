import { Text, TouchableOpacity, View } from "react-native";
import cn from "@/utils/tailwindHelper";
import React from "react";

export type MessageActionType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  routeTo?: () => void;
};

interface MessageActionProps {
  action: MessageActionType;
}

const MessageAction = ({ action }: MessageActionProps) => (
  <TouchableOpacity
    onPress={action.routeTo}
    className="flex-col items-center justify-items-center gap-y-2"
    key={action.id}
  >
    <View className={cn("rounded-full", "p-3", action.bgColor)}>
      {action.icon}
    </View>
    <Text>{action.label}</Text>
  </TouchableOpacity>
);
export default MessageAction;
