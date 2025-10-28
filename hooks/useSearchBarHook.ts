import { router } from "expo-router";
import { useState } from "react";

export default function useSearchBarHook(initialQuery = "") {
  const canGoBack = router.canGoBack();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const onSearchSubmit = () => {
    const q = searchQuery.trim();
    if (!q) return;
    router.replace(`/search/${encodeURIComponent(q)}`);
  };
  const handleChangeText = (text: string) => setSearchQuery(text);
  return {
    canGoBack,
    searchQuery,
    setSearchQuery,
    onSearchSubmit,
    handleChangeText,
  };
}
