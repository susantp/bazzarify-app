import ContentWrapper from "@/components/common/ContentWrapper";
import useAddressesHook from "@/hooks/useAddressesHook";
import AddressListComponent from "@/components/account/setting/AddressListComponent";

const AddressSettingScreen = () => {
  const { addresses, handleSwitchChange } = useAddressesHook();
  return (
    <ContentWrapper className="bg-white">
      {addresses.length > 0 && (
        <AddressListComponent
          addresses={addresses}
          onSwitchChange={handleSwitchChange}
        />
      )}
    </ContentWrapper>
  );
};

export default AddressSettingScreen;
