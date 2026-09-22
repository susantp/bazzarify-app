import React from "react";
import { ErrorState } from "@/components/design-system";

export default function FetchingErrorComponent({
  message,
}: {
  message: string;
}) {
  return (
    <ErrorState
      title={message || "Sorry, something went wrong fetching the data."}
    />
  );
}
