import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import ShippingCoupon from "@/components/common/CouponComponent";
import ContentGridSection from "@/components/home/ContentGridSection";
import { popularItemsData } from "@/constants/popularItemsData";
import React, { ReactElement } from "react";
import ProductCard from "@/components/common/ProductCard";

type VoucherCenterCard = { id: string; component: ReactElement };
export default function Page() {
  const { width } = useWindowDimensions();
  const CARDS: VoucherCenterCard[] = [
    {
      id: "newUserVoucher",
      component: (
        <View className="flex-row items-center gap-x-4 p-4">
          <View>
            <Image
              source={require("@/assets/images/voucher-icon.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View>
            <Text className="text-lg">New User Voucher</Text>
          </View>
        </View>
      ),
    },
    {
      id: "voucherPreview",
      component: (
        <View className="flex items-center bg-purple-200 py-8">
          <ShippingCoupon />
        </View>
      ),
    },
    {
      id: "banner",
      component: (
        <View className="flex items-center">
          <Image
            source={require("@/assets/images/banners/freeShippingVoucher.png")}
            style={{ width: width, height: 40 }}
          />
        </View>
      ),
    },
    {
      id: "voucherSlider",
      component: (
        <View className="flex-row items-center justify-center">
          <ShippingCoupon />
        </View>
      ),
    },
    {
      id: "productList",
      component: (
        <ContentGridSection
          className="align-center flex-col bg-white"
          title={"Popular Items"}
          items={popularItemsData}
          horizontal={false}
          cols={2}
          renderItem={(item, index, cols) => (
            <ProductCard item={item} key={index} cols={cols} />
          )}
        />
      ),
    },
  ];
  return (
    <SafeAreaWrapper className="bg-pink-300">
      <ScreenHeader title="Voucher Center" />
      <ContentWrapper>
        <FlatList
          keyExtractor={(item) => item.id}
          data={CARDS}
          renderItem={({ item }: ListRenderItemInfo<VoucherCenterCard>) =>
            item.component
          }
        />
      </ContentWrapper>
    </SafeAreaWrapper>
  );
}
