import { AxiosError } from "axios";
import * as Sentry from "@sentry/react-native";

export const handleError = (error: AxiosError) => {
  // @ts-ignore
  if (error.response?.data?.metaData?.error) {
    // @ts-ignore
    return error.response?.data?.metaData?.error;
  }
  let msg;
  if (error.response) {
    Sentry.captureException(error.response);
    msg = "Server Error.";
  } else if (error.request) {
    Sentry.captureException(error.request);
    msg = "Something went wrong.";
  } else {
    msg = "Unknown Error.";
    Sentry.captureException(error);
  }

  console.log("auth error: ", error.response?.data);
  return `${msg} Please contact bazzarify support`;
};
