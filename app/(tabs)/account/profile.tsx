import { View } from "react-native";
import ProfileInfo from "@/components/account/profile/ProfileInfo";
import AccountHeader from "@/components/account/AccountHeader";
import React from "react";
import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import OrderStatus from "@/components/account/profile/OrderStatus";
import useOrder from "@/modules/order/hooks/useOrder";
import useOrderStatusBox from "@/modules/order/hooks/useOrderStatusBox";

export default function Page() {
  const { user, orderStatusAggregated, handleStatusPress } = useOrder();
  const { orderStatusBoxes } = useOrderStatusBox();

  return (
    <SafeAreaWrapper>
      <AccountHeader />
      <View className="flex-1 flex-col bg-white px-2 py-2">
        <ProfileInfo user={user} />
        <OrderStatus
          orderStatuses={orderStatusBoxes}
          aggregates={orderStatusAggregated}
          onStatusPress={handleStatusPress}
        />
        {/*<View className="my-6 h-0.5 bg-slate-200" />*/}
        {/*<View className="flex-row flex-wrap gap-y-6">*/}
        {/*  {otherMenus.map(({ id, icon, label, routeTo }) => (*/}
        {/*    <TouchableOpacity*/}
        {/*      className="w-1/4 flex-col items-center gap-y-1"*/}
        {/*      key={randomUUID()}*/}
        {/*      onPress={() => routeTo && router.push(routeTo)}*/}
        {/*    >*/}
        {/*      {icon}*/}
        {/*      <Text className="text-sm">{label}</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  ))}*/}
        {/*</View>*/}
        {/*<View className="my-6 h-0.5 bg-slate-200" />*/}
        {/*<View className="flex-col gap-y-4">*/}
        {/*  <Text className="text-xl">Earn with Bazzarify</Text>*/}
        {/*  <View className="flex-row gap-x-6 rounded-lg border border-slate-400 px-5 py-4">*/}
        {/*    <FontAwesome5*/}
        {/*      name="rupee-sign"*/}
        {/*      size={24}*/}
        {/*      color={Colors.light.tint}*/}
        {/*    />*/}
        {/*    <Text className="text-xl">Earn with bazzarify</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    </SafeAreaWrapper>
  );
}
