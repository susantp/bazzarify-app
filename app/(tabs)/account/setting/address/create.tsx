import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import AddressFormComponent from "@/components/account/setting/address/AddressFormComponent";
import addressFields from "@/constants/addressFields";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { router } from "expo-router";

export default function Page() {
  const createAddressFields = addressFields.filter(
    (item) => item.id !== "action",
  );
  createAddressFields.push({
    id: "action",
    label: "Add",
    action: () => {
      Toast.show({
        position: "bottom",
        text1: "Address added successfully!",
        type: "success",
      });

      setTimeout(() => {
        Alert.alert(
          "Make Default",
          "Want to make this default delivery address ?.",
          [
            {
              text: "YES",
              onPress: () => {
                router.back();
              },
            },
            {
              text: "NO",
              onPress: () => {
                router.back();
              },
            },
          ],
        );
      }, 3000);
    },
  });
  return (
    <SafeAreaWrapper>
      <ScreenHeader title="Add Address" />
      <ContentWrapper>
        <AddressFormComponent fields={createAddressFields} />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
