import { BootTask } from "@/modules/core/types";
import * as Sentry from "@sentry/react-native";

export async function bootstrapApp(tasks: BootTask[]): Promise<void> {
  for (const task of tasks) {
    try {
      await task();
    } catch (err) {
      // don’t block whole pipeline if one task fails
      Sentry.captureException(err);
    }
  }
}
