import { format, isValid, parse, parseISO } from "date-fns";

const candidateDateParsers = (raw: string) => [
  parseISO(raw),
  new Date(raw),
  parse(raw, "yyyy-MM-dd HH:mm:ss", new Date()),
  parse(raw, "yyyy-MM-dd HH:mm:ss.SSS", new Date()),
  parse(raw, "yyyy-MM-dd HH:mm:ss.SSSSSS", new Date()),
];

export default function formatOrderDate(
  raw: string | null | undefined,
  pattern: string,
  fallback = "--",
) {
  if (!raw || !raw.trim()) {
    return fallback;
  }

  const parsed = candidateDateParsers(raw).find((value) => isValid(value));
  if (!parsed) {
    return fallback;
  }

  return format(parsed, pattern);
}
