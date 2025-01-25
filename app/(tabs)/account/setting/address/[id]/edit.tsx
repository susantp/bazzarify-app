import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { useLocalSearchParams } from "expo-router";
import AddressFormComponent from "@/components/account/setting/address/AddressFormComponent";
import addressFields from "@/constants/addressFields";

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Edit Address" />
      <ContentWrapper>
        <AddressFormComponent id={id.toString()} fields={addressFields} />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
