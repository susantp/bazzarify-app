import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import StoreBanner from "@/components/storefront/StoreBanner";
import { useLocalSearchParams } from "expo-router";
import TopBar from "@/components/home/TopBar";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import StoreProducts from "@/modules/storefront/components/StoreProducts";
import useStorefrontHook from "@/modules/storefront/domain/hooks/useStorefrontHook";

export default function Page() {
  const { storeUuid } = useLocalSearchParams<{
    storeUuid: string | string[];
  }>();

  const { storeProducts } = useStorefrontHook(storeUuid.toString());

  if (storeProducts.isLoading) {
    return <ThemedLoader />;
  }
  return (
    <SafeAreaWrapper>
      <TopBar />
      <StoreBanner storeUuid={storeUuid.toString()} />
      <StoreProducts queryResult={storeProducts} />
    </SafeAreaWrapper>
  );
}
