import { axiosInstance } from "@/modules/core/utils/axios";
import authRemotePaths from "@/staticData/remote.paths";
import { TRegisterFormField } from "@/components/common";
import { AxiosError, AxiosResponse } from "axios";
import { setAuthToken } from "@/modules/auth/utils/token";
import * as Sentry from "@sentry/react-native";
import { IApiResponse } from "@/modules/core/types";
import {
  setDataResponse,
  setMetaDataResponse,
} from "@/modules/core/data/apiResponse";

export default async function actionRegister(
  data: TRegisterFormField,
): Promise<IApiResponse<object | string>> {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      authRemotePaths.registerCredentials.path,
      data,
    );

    if (response.data?.metaData?.error) {
      return setMetaDataResponse({
        error: response.data?.metaData?.error,
        errorCode: response.data?.metaData?.errorCode,
      });
    }
    const token = response.data.data.payload.token as string;
    await setAuthToken(token);
    return setDataResponse({ message: "success", payload: { token } });
  } catch (error) {
    if (error instanceof AxiosError) {
      return setMetaDataResponse({
        error: error.response?.data?.metaData?.error,
        errorCode: error.response?.status || 400,
      });
    }
    Sentry.captureException(error);
    return setMetaDataResponse({ error: "FATAL ERROR", errorCode: 500 });
  }
}
