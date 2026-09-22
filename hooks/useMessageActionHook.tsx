import { MessageActionType } from "@/components/account/message/MessageAction";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";

export default function useMessageActionHook() {
  const actions: MessageActionType[] = [
    {
      id: "chats",
      label: "Chats",
      icon: ({ color, size }) => (
        <MaterialIcons name="message" size={size} color={color} />
      ),
      backgroundColor: "success",
      routeTo: () => router.push("/account/message/inbox"),
    },
    {
      id: "package",
      label: "Orders",
      icon: ({ color, size }) => (
        <Feather name="package" size={size} color={color} />
      ),
      backgroundColor: "primary",
    },
    {
      id: "activity",
      label: "Activities",
      icon: ({ color, size }) => (
        <Feather name="activity" size={size} color={color} />
      ),
      backgroundColor: "warning",
      routeTo: () => router.push("/account/message/activities"),
    },
    {
      id: "promos",
      label: "Promos",
      icon: ({ color, size }) => (
        <Ionicons name="megaphone" size={size} color={color} />
      ),
      backgroundColor: "danger",
      routeTo: () => router.push("/account/message/promotions"),
    },
  ];
  return { actions };
}
