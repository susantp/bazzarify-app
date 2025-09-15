import { authAxiosInstance } from "@/modules/core/utils/axios";
import { AxiosResponse } from "axios";
import UserPayloadSchema, {
  TUserPayload,
} from "@/modules/auth/schemas/responsePayloads/UserPayloadSchema";
import { formattedIssues } from "@/modules/core/utils/zod.util";
import * as Sentry from "@sentry/react-native";
import { DataSchema } from "@/modules/core/schemas/DataSchema";

export default async function actionGetUser(
  token: string,
): Promise<TUserPayload | null> {
  const instance = await authAxiosInstance(token);
  let upstream: AxiosResponse<unknown>;
  if (!instance) {
    throw new Error("Authentication error.");
  }

  try {
    upstream = await instance.get("/user");
  } catch (error) {
    const err = new Error("Unable to fetch flash deal products", {
      cause: error,
    });
    Sentry.captureException(err);
    throw err;
  }
  const parsed = DataSchema(UserPayloadSchema).safeParse(upstream.data);
  if (!parsed.success) {
    Sentry.captureException(formattedIssues(parsed.error.issues));
    throw new Error("Api response schema validation failed", {
      cause: formattedIssues(parsed.error.issues),
    });
  }

  return parsed.data.payload;
}
