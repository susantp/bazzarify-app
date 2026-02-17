import * as Linking from "expo-linking";
import { AuthCompletionEvent } from "@/modules/auth/domain/AuthCompletionEvent";

type NormalizeOAuthCallbackInput = {
  url?: string | null;
  params?: Record<string, unknown> | null;
};

const firstString = (value: unknown): string | null => {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return null;
};

const parseSuccess = (value: unknown): boolean => firstString(value) === "true";

export default function normalizeOAuthCallback(
  input: NormalizeOAuthCallbackInput,
): AuthCompletionEvent | null {
  const parsed = input.url ? Linking.parse(input.url) : null;
  const queryParams = parsed?.queryParams ?? {};
  const params = input.params ?? {};

  const token = firstString(params.token ?? queryParams.token);
  const success = parseSuccess(params.success ?? queryParams.success);

  if (!success || !token) {
    return null;
  }

  return { token };
}
