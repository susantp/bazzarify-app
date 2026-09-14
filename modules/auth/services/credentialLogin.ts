import { z } from "zod";
import { TLoginFormField } from "@/components/common";
import { axiosInstance } from "@/modules/core/utils/axios";
import { isAxiosError } from "axios";
import authRemotePaths from "@/staticData/remote.paths";
import { handleError } from "@/modules/core/utils/handleError";
import { ConsumerProxySuccessSchema } from "@/modules/core/schemas/ConsumerProxyResponseSchema";
import * as Sentry from "@sentry/react-native";

const LoginResponseSchema = ConsumerProxySuccessSchema(
  z.object({ token: z.string() }).strict(),
);

const actionLogin = async (data: TLoginFormField): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      authRemotePaths.loginCredentials.path,
      data,
    );
    const parsed = LoginResponseSchema.safeParse(response.data);
    if (!parsed.success || !parsed.data.payload) {
      throw new Error("Login response schema validation failed", {
        cause: parsed.success ? "Missing login token" : parsed.error.issues,
      });
    }

    return parsed.data.payload.token;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return handleError(error);
    }
    Sentry.captureException(error);
    throw error instanceof Error ? error : new Error("Unknown error.");
  }
};
export default actionLogin;
