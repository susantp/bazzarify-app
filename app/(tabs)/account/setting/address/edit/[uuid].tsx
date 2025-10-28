import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import AddressFormComponent from "@/modules/account/components/settings/AddressFormComponent";
import addressFields from "@/modules/account/data/address/addressFields";
import useEditAddressHook from "@/modules/account/hooks/address/useEditAddressHook";

export default function Page() {
  const { uuid, existingAddress, formRef, handleUpdate } = useEditAddressHook();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Edit Address" />
      <ContentWrapper>
        <AddressFormComponent
          id={uuid.toString()}
          fields={addressFields}
          existingAddress={existingAddress}
          onSubmit={handleUpdate}
          ref={formRef}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
