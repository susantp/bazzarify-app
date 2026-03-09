import { axiosInstance } from "@/modules/core/utils/axios";
import authRemotePaths from "@/staticData/remote.paths";
import { TRegisterFormField } from "@/components/common";
import { AxiosError, AxiosResponse } from "axios";
import * as Sentry from "@sentry/react-native";
import { handleError } from "@/modules/core/utils/handleError";
import { toActionFeedbackError } from "@/modules/core/utils/actionFeedback";

const actionRegister = async (data: TRegisterFormField): Promise<string> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      authRemotePaths.registerCredentials.path,
      data,
    );

    if (response.data?.metaData?.error) {
      throw new Error(response.data.metaData.error);
    }
    return response.data.data.payload.token as string;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw toActionFeedbackError(error, handleError(error));
    }
    Sentry.captureException(error);
    throw new Error("Unknown error.");
  }
};

export default actionRegister;
