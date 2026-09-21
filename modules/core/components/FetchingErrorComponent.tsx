import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function FetchingErrorComponent({
  message,
}: {
  message: string;
}) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <ThemedText
        type="title"
        style={{ color: Colors.light.text, textAlign: "center" }}
      >
        {message || "Sorry, something went wrong fetching the data."}
      </ThemedText>
    </View>
  );
}
