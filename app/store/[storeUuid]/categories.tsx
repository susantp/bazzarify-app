import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import StoreBanner from "@/components/storefront/StoreBanner";
import { useLocalSearchParams } from "expo-router";
import TopBar from "@/components/home/TopBar";
import StoreCategories from "@/modules/storefront/components/StoreCategories";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import useStorefrontHook from "@/modules/storefront/domain/hooks/useStorefrontHook";

export default function Page() {
  const { storeUuid } = useLocalSearchParams<{
    storeUuid: string | string[];
  }>();
  const { storeCategories } = useStorefrontHook(storeUuid.toString());
  if (storeCategories.isLoading) {
    return <ThemedLoader />;
  }
  return (
    <SafeAreaWrapper>
      <TopBar />
      <StoreBanner storeUuid={storeUuid.toString()} />
      <StoreCategories queryResult={storeCategories} />
    </SafeAreaWrapper>
  );
}
