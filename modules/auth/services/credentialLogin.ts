import { TLoginFormField } from "@/components/common";
import { axiosInstance } from "@/modules/core/utils/axios";
import { AxiosError } from "axios";
import authRemotePaths from "@/staticData/remote.paths";
import { handleError } from "@/modules/core/utils/handleError";
import * as Sentry from "@sentry/react-native";

const actionLogin = async (data: TLoginFormField): Promise<string> => {
  debugger;
  try {
    const response = await axiosInstance.post(
      authRemotePaths.loginCredentials.path,
      data,
    );
    if (response.data.metaData.error) {
      throw new Error(response.data.metaData.error);
    }

    return response.data.data.payload.token as string;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(handleError(error));
    }
    Sentry.captureException(error);
    throw new Error("Unknown error.");
  }
};
export default actionLogin;
