import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ContentWrapper from "@/components/common/ContentWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Text } from "react-native";

const PaymentScreen = () => {
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Payment" />
      <ContentWrapper>
        <Text>hello</Text>
      </ContentWrapper>
    </SafeAreaWrapper>
  );
};
export default PaymentScreen;
