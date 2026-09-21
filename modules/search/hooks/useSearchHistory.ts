import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import {
  actionClearSearchHistory,
  actionGetSearchHistory,
  actionRemoveSearchHistory,
  actionRememberSearchHistory,
} from "@/modules/search/actions/searchHistory";
import * as Sentry from "@sentry/react-native";
import { TSearchHistoryPayload } from "@/modules/search/schemas/SearchHistoryPayloadSchema";

export default function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actor, setActor] = useState<TSearchHistoryPayload["actor"] | null>(null);

  const refreshHistory = useCallback(async () => {
    try {
      const payload = await actionGetSearchHistory();
      setHistory(payload.history);
      setActor(payload.actor);
    } catch (error) {
      Sentry.captureException(error);
      setHistory([]);
      setActor(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      void refreshHistory().finally(() => setIsLoading(false));
      return undefined;
    }, [refreshHistory]),
  );

  const addEntry = useCallback(async (query: string) => {
    const payload = await actionRememberSearchHistory(query);
    setHistory(payload.history);
    setActor(payload.actor);
    return payload.history;
  }, []);

  const removeEntry = useCallback(async (query: string) => {
    const payload = await actionRemoveSearchHistory(query);
    setHistory(payload.history);
    setActor(payload.actor);
    return payload.history;
  }, []);

  const clearAll = useCallback(async () => {
    const payload = await actionClearSearchHistory();
    setHistory(payload.history);
    setActor(payload.actor);
  }, []);

  return {
    history,
    isLoading,
    actor,
    refreshHistory,
    addEntry,
    removeEntry,
    clearAll,
  };
}
