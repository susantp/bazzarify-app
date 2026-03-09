import { $ZodIssue } from "zod/v4/core";
import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { ActionFeedbackError } from "@/modules/core/utils/actionFeedback";

export type ValidationFieldErrors = Record<string, string[]>;

export interface ValidationFeedback {
  summary: string;
  fieldErrors: ValidationFieldErrors;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const pushFieldError = (
  fieldErrors: ValidationFieldErrors,
  path: string,
  message: string,
) => {
  if (!fieldErrors[path]) {
    fieldErrors[path] = [];
  }
  fieldErrors[path].push(message);
};

export const fromZodIssues = (issues: $ZodIssue[]): ValidationFeedback => {
  const fieldErrors: ValidationFieldErrors = {};
  issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (path) {
      pushFieldError(fieldErrors, path, issue.message);
    }
  });

  return {
    summary: "Please fix the highlighted fields.",
    fieldErrors,
  };
};

const fromStructuredPayload = (value: unknown): ValidationFeedback | null => {
  if (typeof value === "string") {
    return { summary: value, fieldErrors: {} };
  }

  if (!isRecord(value)) {
    return null;
  }

  const fieldErrors: ValidationFieldErrors = {};
  Object.entries(value).forEach(([key, entry]) => {
    if (typeof entry === "string") {
      pushFieldError(fieldErrors, key, entry);
      return;
    }

    if (Array.isArray(entry)) {
      entry.forEach((item) => {
        if (typeof item === "string") {
          pushFieldError(fieldErrors, key, item);
        }
      });
    }
  });

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  if (!hasFieldErrors) {
    return null;
  }

  return {
    summary: "Please fix the highlighted fields.",
    fieldErrors,
  };
};

export const getValidationFeedback = (
  input: unknown,
  fallbackSummary = "Please fix the highlighted fields.",
): ValidationFeedback | null => {
  if (input instanceof ActionFeedbackError) {
    const structured = fromStructuredPayload(input.details);
    if (structured) {
      return structured;
    }

    return {
      summary: input.message || fallbackSummary,
      fieldErrors: {},
    };
  }

  const structured = fromStructuredPayload(input);
  if (structured) {
    return structured;
  }

  return null;
};

export const applyValidationFeedback = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  feedback: ValidationFeedback,
) => {
  Object.entries(feedback.fieldErrors).forEach(([path, messages]) => {
    const message = messages[0];
    if (!message) {
      return;
    }
    setError(path as FieldPath<TFieldValues>, {
      type: "manual",
      message,
    });
  });
};
