import { z } from "zod";
import { axiosInstance } from "@/modules/core/utils/axios";
import authRemotePaths from "@/staticData/remote.paths";
import { TRegisterFormField } from "@/components/common";
import { AxiosResponse, isAxiosError } from "axios";
import { setStorage } from "@/modules/core/utils/secureStore";
import * as Sentry from "@sentry/react-native";
import type { ConsumerProxyResponse } from "@/modules/core/types";
import {
  ConsumerProxyFailureSchema,
  ConsumerProxySuccessSchema,
} from "@/modules/core/schemas/ConsumerProxyResponseSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import { AUTH_TOKEN_KEY } from "@/modules/auth/config";

const RegisterResponseSchema = ConsumerProxySuccessSchema(
  z.object({ token: z.string() }).strict(),
);
type RegisterPayload = { token: string };

export default async function actionRegister(
  data: TRegisterFormField,
): Promise<ConsumerProxyResponse<RegisterPayload>> {
  try {
    const response: AxiosResponse<unknown> = await axiosInstance.post(
      authRemotePaths.registerCredentials.path,
      data,
    );

    const parsed = RegisterResponseSchema.safeParse(response.data);
    if (!parsed.success || !parsed.data.payload) {
      return {
        error: parsed.success
          ? "Registration token missing"
          : formattedIssues(parsed.error.issues),
        errorCode: 502,
      };
    }

    await setStorage(AUTH_TOKEN_KEY, parsed.data.payload.token);
    return parsed.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const parsedFailure = ConsumerProxyFailureSchema.safeParse(
        error.response?.data,
      );
      if (parsedFailure.success) {
        return parsedFailure.data;
      }
    }
    Sentry.captureException(error);
    return { error: "FATAL ERROR", errorCode: 500 };
  }
}
