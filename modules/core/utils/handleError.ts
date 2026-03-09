import { AxiosError } from "axios";
import * as Sentry from "@sentry/react-native";
import { getActionFeedback } from "@/modules/core/utils/actionFeedback";

export const handleError = (error: AxiosError) => {
  const feedback = getActionFeedback(error, "Something went wrong.");
  if (error.response) {
    Sentry.captureException(error.response);
  } else if (error.request) {
    Sentry.captureException(error.request);
  } else {
    Sentry.captureException(error);
  }
  return feedback.message;
};
