import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import StoreBanner from "@/components/storefront/StoreBanner";
import TopBar from "@/components/home/TopBar";
import { useLocalSearchParams } from "expo-router";
import StoreTopProducts from "@/modules/storefront/components/StoreTopProducts";
import useStorefrontHook from "@/modules/storefront/domain/hooks/useStorefrontHook";

export default function Page() {
  const { storeUuid } = useLocalSearchParams<{
    storeUuid: string | string[];
  }>();
  const { storeTopProducts } = useStorefrontHook(storeUuid?.toString());

  return (
    <SafeAreaWrapper>
      <TopBar />
      <StoreBanner storeUuid={storeUuid.toString()} />
      <StoreTopProducts queryResult={storeTopProducts} />
    </SafeAreaWrapper>
  );
}
