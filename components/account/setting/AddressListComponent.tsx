import { AddressType } from "@/components/account/setting/data/addressList";
import { FlatList, Switch, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { MapEditIcon } from "@/components/common/icons";

interface IAddressListComponentProps {
  addresses: AddressType[];
  onSwitchChange: (id: string, value: boolean) => void;
}

const AddressListComponent = ({
  addresses,
  onSwitchChange,
}: IAddressListComponentProps) => {
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
              <View className="w-9/12">
                <Text className="text-md font-semibold">{item.label}</Text>
              </View>
              <TouchableOpacity className="w-1/12 items-start">
                <MapEditIcon />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AddressListComponent;
