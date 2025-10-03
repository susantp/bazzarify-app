import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useLocalSearchParams } from "expo-router";
import AddressFormComponent from "@/modules/account/components/settings/AddressFormComponent";
import addressFields from "@/modules/account/data/address/addressFields";

export default function EditScreen() {
  const { uuid } = useLocalSearchParams();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Edit Address" />
      <ContentWrapper>
        <AddressFormComponent id={uuid.toString()} fields={addressFields} />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
