import { SafeAreaWrapper } from "@/components/common/SafeAreaWrapper";
import ScreenHeader from "@/components/common/ScreenHeader";
import ContentWrapper from "@/components/common/ContentWrapper";
import {
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import ShippingCoupon from "@/components/common/CouponComponent";
import React, { ReactElement } from "react";
import ThemedLoader from "@/modules/core/components/ThemedLoader";
import { Box, Image, Text } from "@/components/design-system";
import { useBazarifyTheme } from "@/components/design-system/theme";

type VoucherCenterCard = { id: string; component: ReactElement };
export default function Page() {
  const { width } = useWindowDimensions();
  const theme = useBazarifyTheme();
  const CARDS: VoucherCenterCard[] = [
    {
      id: "newUserVoucher",
      component: (
        <Box direction="row" align="center" gap="lg" padding="lg">
          <Image
            source={require("@/assets/images/voucher-icon.png")}
            size={30}
            radius="none"
          />
          <Text variant="title">New User Voucher</Text>
        </Box>
      ),
    },
    {
      id: "voucherPreview",
      component: (
        <Box align="center" backgroundColor="primarySurface" paddingY="xxxl">
          <ShippingCoupon />
        </Box>
      ),
    },
    {
      id: "banner",
      component: (
        <Box align="center">
          <Image
            source={require("@/assets/images/banners/freeShippingVoucher.png")}
            style={{ width: width, height: 40 }}
          />
        </Box>
      ),
    },
    {
      id: "voucherSlider",
      component: (
        <Box direction="row" align="center" justify="center">
          <ShippingCoupon />
        </Box>
      ),
    },
    {
      id: "productList",
      component: <ThemedLoader />,
    },
  ];
  return (
    <SafeAreaWrapper style={{ backgroundColor: theme.colors.primarySurface }}>
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
