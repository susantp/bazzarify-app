import { AddressType } from "@/components/account/setting/data/addressList";
import { FlatList, Switch, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useRecoilState } from "recoil";
import { addressModalAtom } from "@/atoms/addressModalAtom";

interface IAddressListComponentProps {
  addresses: AddressType[];
  onSwitchChange: (id: string, value: boolean) => void;
}

const AddressListComponent = ({
  addresses,
  onSwitchChange,
}: IAddressListComponentProps) => {
  const [showModal, setShowModal] = useRecoilState(addressModalAtom);

  const handleEditPress = (item: AddressType) => {
    setShowModal(!showModal);
    router.push(`/account/setting/address/${item.id}/edit`);
  };
  return (
    <View className="bg-white">
      <FlatList
        data={addresses}
        renderItem={({ item, index }) => {
          return (
            <View
              className={`flex-row items-center justify-between ${addresses.length - 1 !== index ? "border-b" : undefined} border-b-gray-400 px-2 py-6`}
            >
              <View className="w-2/12 items-start">
                <Switch
                  value={item.default}
                  thumbColor={item.default ? "white" : "gray"}
                  trackColor={{ true: Colors.light.tint }}
                  onValueChange={(value) => onSwitchChange(item.id, value)}
                />
              </View>
              <View className="w-8/12">
                <Text className="text-md font-semibold">{item.label}</Text>
              </View>
              <TouchableOpacity
                className="w-2/12 items-center rounded-lg bg-orange-600 py-2"
                onPress={() => handleEditPress(item)}
              >
                <Text className="text-xl text-white">Edit</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AddressListComponent;
