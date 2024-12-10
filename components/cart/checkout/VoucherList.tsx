import ShippingCoupon from "@/components/common/CouponComponent";
import { FlatList, Text, View } from "react-native";
import React from "react";

const VoucherList = () => {
  const VOUCHERS = [
    { component: <ShippingCoupon /> },
    { component: <ShippingCoupon /> },
    { component: <ShippingCoupon /> },
  ];
  return (
    <View className="flex-col rounded-2xl border border-gray-300 p-4">
      <View className="gap-y-2 py-2">
        <Text className="text-xl font-bold">Voucher</Text>
        <FlatList
          contentContainerStyle={{ columnGap: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={VOUCHERS}
          renderItem={({ item }) => item.component}
        />
      </View>
    </View>
  );
};

export default VoucherList;
