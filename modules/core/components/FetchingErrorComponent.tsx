import { ThemedText } from "@/components/ThemedText";
import React from "react";

export default function FetchingErrorComponent({
  message,
}: {
  message: string;
}) {
  return (
    <ThemedText type="title" style={{ color: "#fff" }} className="p-4">
      {message || "Sorry, something went wrong fetching the data."}
    </ThemedText>
  );
}
