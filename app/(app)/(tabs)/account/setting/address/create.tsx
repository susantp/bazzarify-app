import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import AddressFormComponent from "@/modules/account/components/settings/AddressFormComponent";
import addressFields from "@/modules/account/data/address/addressFields";
import useCreateAddressHook from "@/modules/account/hooks/address/useCreateAddressHook";
import { useAtomValue, useSetAtom } from "jotai";
import { addressDraftAtom } from "@/modules/user/atoms/addresessAtom";
import { useEffect } from "react";

export default function Page() {
  const { handleCreate, formRef } = useCreateAddressHook();
  const addressDraft = useAtomValue(addressDraftAtom);
  const setAddressDraft = useSetAtom(addressDraftAtom);

  useEffect(() => {
    return () => {
      setAddressDraft(null);
    };
  }, [setAddressDraft]);
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Add Address" />
      <ContentWrapper>
        <AddressFormComponent
          ref={formRef}
          fields={addressFields}
          existingAddress={null}
          initialValues={addressDraft || undefined}
          onSubmit={handleCreate}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
