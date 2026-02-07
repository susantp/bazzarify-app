import { z } from "zod";
import { authAxiosInstance } from "@/modules/core/utils/axios";
import * as Sentry from "@sentry/react-native";
import { formattedIssues } from "@/modules/core/utils/zod.util";

const OrderStatusObjectSchema = z
  .object({
    uuid: z.string().optional(),
    code: z.string(),
    label: z.string().optional(),
  })
  .strip();
const OrderStatusesSchema = z.array(
  z.union([z.string(), OrderStatusObjectSchema]),
);

export default async function actionGetOrderStatuses(
  token: string,
): Promise<string[]> {
  const instance = await authAxiosInstance({
    token,
    modulePath: "consumers",
  });
  if (!instance) {
    throw new Error("Authentication error.");
  }
  let upstream: unknown;
  try {
    const response = await instance.get("orders/statuses");
    upstream = response.data;
  } catch (error: unknown) {
    const err = new Error("Unable to get order statuses", { cause: error });
    Sentry.captureException(err);
    throw err;
  }

  const parsed = OrderStatusesSchema.safeParse(upstream);
  if (!parsed.success) {
    const issues = formattedIssues(parsed.error.issues);
    Sentry.captureException(issues);
    throw new Error("API response schema validation failed", { cause: issues });
  }

  return Array.from(
    new Set(
      parsed.data
        .map((item) => (typeof item === "string" ? item : item.code))
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}
