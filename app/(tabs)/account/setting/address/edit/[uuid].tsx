import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useLocalSearchParams } from "expo-router";
import AddressFormComponent, {
  AddressFormRef,
} from "@/modules/account/components/settings/AddressFormComponent";
import addressFields from "@/modules/account/data/address/addressFields";
import { useAtomValue } from "jotai";
import { getAddressByUuidAtom } from "@/modules/user/atoms/addresessAtom";
import { useRef } from "react";

export default function Page() {
  const { uuid } = useLocalSearchParams();
  const getAddress = useAtomValue(getAddressByUuidAtom);
  const existingAddress = getAddress(uuid.toString());
  const formRef = useRef<AddressFormRef>(null);
  const handleUpdate = () => {
    if (formRef.current) {
      const fieldValues = formRef.current.getFieldValues();
      console.log("Form field values:", fieldValues);
      // Here you can process the field values, e.g., save to backend
    }
  };
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Edit Address" />
      <ContentWrapper>
        <AddressFormComponent
          id={uuid.toString()}
          fields={addressFields}
          existingAddress={existingAddress}
          onUpdate={handleUpdate}
          ref={formRef}
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
