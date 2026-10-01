import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { EmptyState } from "@/components/design-system";

export default function Page() {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Voucher Center" />
      <ContentWrapper>
        <EmptyState
          title="No vouchers available"
          description="Vouchers are not available for this order yet."
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
