import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import AddressFormComponent from "@/modules/account/components/settings/AddressFormComponent";
import addressFields from "@/modules/account/data/address/addressFields";
import useCreateAddressHook from "@/modules/account/hooks/address/useCreateAddressHook";

export default function Page() {
  const { handleCreate, formRef } = useCreateAddressHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Add Address" />
      <ContentWrapper>
        <AddressFormComponent
          ref={formRef}
          fields={addressFields}
          existingAddress={null}
          onSubmit={handleCreate}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
