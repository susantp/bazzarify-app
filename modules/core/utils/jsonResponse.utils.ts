import { IApiData, IApiMetaData } from "@/modules/core/types";

import * as Sentry from "@sentry/react-native";
import { AxiosError, isAxiosError } from "axios";
import { MetaDataSchema } from "@/modules/core/schemas/MetaDataSchema";

export const handleSuccess = <T>(data: IApiData<T>) =>
  data as IApiData<unknown>;

export const handleError = (error: unknown) => {
  let msg = "Unknown error";
  if (isAxiosError(error)) {
    const ax = error as AxiosError;
    const parsed = MetaDataSchema.safeParse(ax.response?.data);
    const metaData = parsed.success
      ? parsed.data
      : ({ error: ax.message, errorCode: 502 } as IApiMetaData);
    Sentry.captureException(metaData);
    return metaData;
  }

  msg = error instanceof Error ? error.message : msg;
  Sentry.captureException(msg);
  return { error: msg, errorCode: 500 } as IApiMetaData;
};
