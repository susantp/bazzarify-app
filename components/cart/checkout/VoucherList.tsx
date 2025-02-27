import ShippingCoupon from "@/components/common/CouponComponent";
import { FlatList, Text, View } from "react-native";
import React from "react";
import cn from "@/utils/tailwindHelper";

interface VoucherListProps {
  className?: string;
}

const VoucherList = ({ className }: VoucherListProps) => {
  const VOUCHERS = [
    { component: <ShippingCoupon /> },
    { component: <ShippingCoupon /> },
    { component: <ShippingCoupon /> },
  ];
  return (
    <View className={cn(`flex-col`, className)}>
      <View className="gap-y-2 rounded-2xl border border-gray-300 p-4">
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
