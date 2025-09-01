import { $ZodIssue } from "zod/v4/core";

export const formattedIssues = (issues: $ZodIssue[]) =>
  issues.map((issue: $ZodIssue) => ({
    path: issue.path.join("."),
    message: issue.message,
    code: issue.code,
  }));
