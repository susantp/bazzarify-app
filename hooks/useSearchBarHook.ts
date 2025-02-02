import { router } from "expo-router";
import { useState } from "react";

export default function useSearchBarHook() {
  const canGoBack = router.canGoBack();
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchSubmit = () => router.push(`/search/${searchQuery}`);
  const handleChangeText = (text: string) => setSearchQuery(text);
  return {
    canGoBack,
    searchQuery,
    setSearchQuery,
    onSearchSubmit,
    handleChangeText,
  };
}
