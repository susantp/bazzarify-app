import { Text, TouchableOpacity, View } from "react-native";
import {
  BackwardIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "react-native-heroicons/solid";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { LocationGeocodedAddress } from "expo-location";
import { addDays, format, isSameMonth } from "date-fns";

const ParcelIcon = ({ size }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 20 19" fill="none">
    <Path
      d="M19.1086 5.59295C19.1068 5.5265 19.0978 5.46044 19.0819 5.39591C19.0754 5.3729 19.0625 5.3508 19.0542 5.32778C19.0349 5.2753 19.0174 5.22374 18.9898 5.17586C18.9751 5.151 18.9548 5.13075 18.9373 5.10681C18.9078 5.06538 18.8793 5.02302 18.8434 4.98712C18.8222 4.96686 18.7946 4.95029 18.7716 4.93095C18.7357 4.90149 18.7025 4.86927 18.6611 4.84441L18.6482 4.83888L18.6408 4.83336L10.3737 0.238984C10.2372 0.163066 10.0835 0.123147 9.9273 0.122986C9.77106 0.122825 9.61735 0.162427 9.48063 0.238063L1.17485 4.83244C1.1724 4.83551 1.16902 4.83857 1.16472 4.84164L1.15552 4.84533C1.12329 4.86374 1.09935 4.89044 1.06897 4.91254C1.03582 4.9374 1.00084 4.9595 0.971374 4.98804C0.943753 5.01658 0.922576 5.04973 0.898637 5.08195C0.874699 5.11418 0.846157 5.14272 0.825901 5.1777C0.801962 5.2173 0.789072 5.26241 0.771579 5.30568C0.758689 5.33607 0.742116 5.36461 0.733829 5.39776C0.718103 5.46108 0.709153 5.52589 0.707129 5.59111C0.706208 5.60676 0.700684 5.62057 0.700684 5.63714V13.0047C0.700684 13.3389 0.882065 13.6474 1.17485 13.8094L9.44104 18.401L9.44196 18.4019L9.4438 18.4029L9.46222 18.413C9.50181 18.4351 9.54508 18.4471 9.58651 18.4627C9.61598 18.4747 9.64452 18.4903 9.67582 18.4986C9.82855 18.5386 9.98898 18.5386 10.1417 18.4986C10.1721 18.4903 10.2006 18.4747 10.231 18.4627C10.2724 18.4471 10.3157 18.436 10.3553 18.413L10.3737 18.4029L10.3756 18.4019L10.3765 18.401L18.6427 13.8094C18.9336 13.6474 19.115 13.3389 19.115 13.0047V5.63714C19.115 5.62149 19.1095 5.6086 19.1086 5.59295ZM9.88206 9.204L3.51623 5.64359L6.05925 4.23673L12.3514 7.83213L9.88206 9.204ZM9.92626 2.09699L16.2985 5.63898L14.2324 6.78712L7.94396 3.19356L9.92626 2.09699ZM10.8286 16.044L10.8304 10.8152L13.5907 9.27029V12.084L15.4321 11.1633V8.24001L17.2736 7.20973V12.4624L10.8286 16.044Z"
      fill="#232A50"
    />
  </Svg>
);
const ProductDeliveryDetails = ({
  onOpenMap,
  currentAddress,
  chosenAddress,
}: {
  onOpenMap: () => void;
  currentAddress: LocationGeocodedAddress | null;
  chosenAddress: LocationGeocodedAddress | null;
}) => {
  const today = new Date();
  const start = addDays(today, 7);
  const end = addDays(today, 8);
  const deliveryDate = isSameMonth(start, end)
    ? `${format(start, "d")} - ${format(end, "d MMM")}`
    : `${format(start, "d MMM")} - ${format(end, "d MMM")}`;

  return (
    <View className="p-4">
      <View
        id="delivery-info"
        className="flex-col gap-y-3 rounded-xl border border-gray-400 p-4"
      >
        <Text className="text-xl font-semibold">Delivery</Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-items-center gap-x-2">
            <MapPinIcon size={28} strokeWidth={1} color="black" />
            <Text
              style={{ width: 200 }}
              lineBreakMode="clip"
              numberOfLines={2}
              className="text-sm font-semibold"
            >
              {chosenAddress?.formattedAddress ||
                currentAddress?.formattedAddress ||
                "Select your address"}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={onOpenMap}>
              <Text className="rounded-full bg-primary px-2 py-1 text-white">
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-items-center gap-x-2">
            <BackwardIcon size={28} strokeWidth={1} color="black" />
            <Text className="text-md font-semibold">14 days free returns</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-items-center gap-x-2">
            <ShieldCheckIcon size={28} strokeWidth={1} color="black" />
            <Text className="text-md font-semibold">
              1 year brand seller warranty
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-col items-center justify-items-center gap-y-2">
            <View className="flex-row items-center justify-items-center gap-x-2">
              <ParcelIcon size={28} />
              <Text className="text-md font-semibold">
                Get by {deliveryDate}
              </Text>
            </View>
            <Text className="text-sm text-gray-500">Standard Delivery</Text>
          </View>

          <View>
            <Text className="text-md">Rs. 100</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductDeliveryDetails;
