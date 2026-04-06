import { router } from "expo-router";
import { useEffect, useState } from "react";
import { actionRememberSearchHistory } from "@/modules/search/actions/searchHistory";

export default function useSearchBarHook(initialQuery = "") {
  const canGoBack = router.canGoBack();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const onSearchSubmit = () => {
    const q = searchQuery.trim();
    if (!q) return;
    void actionRememberSearchHistory(q).catch(() => undefined);
    router.replace(`/search/${encodeURIComponent(q)}`);
  };
  const handleChangeText = (text: string) => setSearchQuery(text);
  return {
    canGoBack,
    searchQuery,
    onSearchSubmit,
    handleChangeText,
  };
}
