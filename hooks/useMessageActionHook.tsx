import { MessageActionType } from "@/components/account/message/MessageAction";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";

export default function useMessageActionHook() {
  const actions: MessageActionType[] = [
    {
      id: "message",
      label: "Message",
      icon: <MaterialIcons name="message" size={30} color={"#fff"} />,
      bgColor: "bg-green-500",
    },
    {
      id: "package",
      label: "Orders",
      icon: <Feather name="package" size={30} color={"#fff"} />,
      bgColor: "bg-blue-500",
    },
    {
      id: "activity",
      label: "Activities",
      icon: <Feather name="activity" size={30} color={"#fff"} />,
      bgColor: "bg-amber-500",
      routeTo: () => router.push("/account/message/activities"),
    },
    {
      id: "promos",
      label: "Promos",
      icon: <Ionicons name="megaphone" size={30} color={"#fff"} />,
      bgColor: "bg-pink-500",
      routeTo: () => router.push("/account/message/promotions"),
    },
  ];
  return { actions };
}
