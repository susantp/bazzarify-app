import { AxiosError } from "axios";

export type ActionFeedbackSeverity = "error" | "warning" | "info";

export interface ActionFeedback {
  message: string;
  errorCode: number | null;
  severity: ActionFeedbackSeverity;
  details?: unknown;
}

type EnvelopeMeta = {
  error?: unknown;
  errorCode?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const flattenFeedbackMessage = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (Array.isArray(value)) {
    const messages = value
      .map((entry) => flattenFeedbackMessage(entry))
      .filter((entry): entry is string => Boolean(entry));
    return messages.length > 0 ? messages.join(", ") : null;
  }
  if (isRecord(value)) {
    const messages = Object.values(value)
      .map((entry) => flattenFeedbackMessage(entry))
      .filter((entry): entry is string => Boolean(entry));
    return messages.length > 0 ? messages.join(", ") : null;
  }

  return null;
};

const parseErrorCode = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const getEnvelopeMeta = (value: unknown): EnvelopeMeta | null => {
  if (!isRecord(value) || !("metaData" in value) || !isRecord(value.metaData)) {
    return null;
  }

  return value.metaData as EnvelopeMeta;
};

export const hasEnvelopeError = (value: unknown): boolean => {
  const meta = getEnvelopeMeta(value);
  return Boolean(meta && flattenFeedbackMessage(meta.error));
};

const getSeverity = (errorCode: number | null): ActionFeedbackSeverity => {
  if (errorCode !== null && errorCode >= 400 && errorCode < 500) {
    return "warning";
  }

  return "error";
};

export const getActionFeedback = (
  input: unknown,
  fallbackMessage = "Something went wrong.",
): ActionFeedback => {
  const fromEnvelope = getEnvelopeMeta(input);
  if (fromEnvelope) {
    return {
      message:
        flattenFeedbackMessage(fromEnvelope.error) ?? fallbackMessage,
      errorCode: parseErrorCode(fromEnvelope.errorCode),
      severity: getSeverity(parseErrorCode(fromEnvelope.errorCode)),
      details: fromEnvelope.error,
    };
  }

  if (input instanceof AxiosError) {
    const responseData = input.response?.data;
    const nestedEnvelope = getEnvelopeMeta(responseData);
    if (nestedEnvelope) {
      return {
        message:
          flattenFeedbackMessage(nestedEnvelope.error) ?? fallbackMessage,
        errorCode: parseErrorCode(nestedEnvelope.errorCode),
        severity: getSeverity(parseErrorCode(nestedEnvelope.errorCode)),
        details: nestedEnvelope.error,
      };
    }

    return {
      message:
        flattenFeedbackMessage(input.message) ??
        flattenFeedbackMessage(input.code) ??
        fallbackMessage,
      errorCode: parseErrorCode(input.response?.status),
      severity: getSeverity(parseErrorCode(input.response?.status)),
    };
  }

  if (input instanceof Error) {
    const maybeCode = parseErrorCode((input as Error & { errorCode?: unknown }).errorCode);
    return {
      message: flattenFeedbackMessage(input.message) ?? fallbackMessage,
      errorCode: maybeCode,
      severity: getSeverity(maybeCode),
      details: (input as Error & { details?: unknown }).details,
    };
  }

  return {
    message: flattenFeedbackMessage(input) ?? fallbackMessage,
    errorCode: null,
    severity: getSeverity(null),
  };
};

export class ActionFeedbackError extends Error {
  errorCode: number | null;

  severity: ActionFeedbackSeverity;

  details?: unknown;

  constructor(feedback: ActionFeedback) {
    super(feedback.message);
    this.name = "ActionFeedbackError";
    this.errorCode = feedback.errorCode;
    this.severity = feedback.severity;
    this.details = feedback.details;
  }
}

export const toActionFeedbackError = (
  input: unknown,
  fallbackMessage?: string,
) => new ActionFeedbackError(getActionFeedback(input, fallbackMessage));

export const throwIfEnvelopeFailed = (
  input: unknown,
  fallbackMessage = "Request failed.",
) => {
  const feedback = getActionFeedback(input, fallbackMessage);
  if (hasEnvelopeError(input)) {
    throw new ActionFeedbackError(feedback);
  }
};
