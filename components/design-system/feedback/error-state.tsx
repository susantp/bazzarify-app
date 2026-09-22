import React from "react";
import { Button, type ButtonProps } from "../controls/button";
import { Text } from "../primitives/text";
import { FeedbackContainer } from "./feedback-container";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: Omit<ButtonProps, "variant" | "size">;
  testID?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  testID,
}: ErrorStateProps) {
  return (
    <FeedbackContainer testID={testID}>
      <Text variant="title" align="center">
        {title}
      </Text>
      {description ? (
        <Text color="textMuted" align="center">
          {description}
        </Text>
      ) : null}
      {action ? <Button {...action} size="sm" /> : null}
    </FeedbackContainer>
  );
}
