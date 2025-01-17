import { Href } from "expo-router";
import _ from "underscore";
import React from "react";
import CardPaymentComponent from "@/components/cart/payment/CardPaymentComponent";
import BottomActionView from "@/components/common/BottomActionView";
import CardPaymentBottomActionView from "@/components/cart/payment/CardPaymentBottomActionView";
import CODPaymentComponent from "@/components/cart/payment/CODPaymentComponent";
import CODPaymentBottomActionView from "@/components/cart/payment/CODPaymentBottomActionView";
import ImePayPaymentComponent from "@/components/cart/payment/ImePayPaymentComponent";
import ImePayPaymentBottomActionView from "@/components/cart/payment/ImePayPaymentBottomActionView";
import useBottomViewHook from "@/hooks/useBottomViewHook";

export type PaymentMethodSection = {
  sectionTitle: string;
  methods: PaymentMethodType[];
};
export type PaymentMethodType = {
  name: string;
  icon: string;
  pathname: Href;
  id: string;
  voucherMsg?: string;
};
export default function usePaymentScreenHook(id?: string) {
  const { handleBottomViewLayoutEvent, paddingAfterBottomView } =
    useBottomViewHook();
  const componentMap: Record<PaymentMethodType["id"], React.ReactNode> = {
    card: (
      <>
        <CardPaymentComponent />
        <BottomActionView onLayoutEvent={handleBottomViewLayoutEvent}>
          <CardPaymentBottomActionView
            totalPrice={399}
            subTotalPrice={399}
            actionBtn="Pay Now"
          />
        </BottomActionView>
      </>
    ),
    cod: (
      <>
        <CODPaymentComponent />
        <BottomActionView onLayoutEvent={handleBottomViewLayoutEvent}>
          <CODPaymentBottomActionView
            actionBtn="Place Order"
            cashPaymentFee={10}
            totalPrice={333}
            subTotalPrice={323}
          />
        </BottomActionView>
      </>
    ),
    imePay: (
      <>
        <ImePayPaymentComponent />
        <BottomActionView onLayoutEvent={handleBottomViewLayoutEvent}>
          <ImePayPaymentBottomActionView
            totalPrice={323}
            subTotalPrice={323}
            actionBtn={"Pay Now"}
          />
        </BottomActionView>
      </>
    ),
  };
  const CartPaymentMethod: PaymentMethodType = {
    id: "card",
    name: "Card payment",
    icon: "credit_card_icon",
    pathname: "/cart/paymentScreen/card",
    voucherMsg:
      "Ensure you have collected the payment voucher to get Bank and Wallet Discounts. 0% EMI available on selected bank partners.",
  };
  const IMEPayPaymentMethod: PaymentMethodType = {
    id: "imePay",
    name: "Ime Pay",
    icon: "ime_pay_icon",
    pathname: "/cart/paymentScreen/imePay",
    voucherMsg:
      "Ensure you have collected the payment voucher to get Bank and Wallet Discounts. 0% EMI available on selected bank partners.",
  };
  const ConnectIPSPaymentMethod: PaymentMethodType = {
    id: "connectIPS",
    name: "Connect IPS",
    icon: "connect_ips_icon",
    pathname: "/cart/paymentScreen/connectIPS",
    voucherMsg:
      "Ensure you have collected the payment voucher to get Bank and Wallet Discounts. 0% EMI available on selected bank partners.",
  };
  const CODPayPaymentMethod: PaymentMethodType = {
    id: "cod",
    name: "Cash On Delivery",
    icon: "cash_on_delivery_icon",
    pathname: "/cart/paymentScreen/cod",
    voucherMsg:
      "Ensure you have collected the payment voucher to get Bank and Wallet Discounts. 0% EMI available on selected bank partners.",
  };
  const paymentMethodSections: PaymentMethodSection[] = [
    {
      sectionTitle: "Recommended Method",
      methods: [CartPaymentMethod],
    },
    {
      sectionTitle: "Digital Payment Method",
      methods: [IMEPayPaymentMethod, ConnectIPSPaymentMethod],
    },
    {
      sectionTitle: "Recommended Method",
      methods: [CODPayPaymentMethod],
    },
  ];
  const paymentMethodById: PaymentMethodType | undefined = _.find(
    _.flatten(_.pluck(paymentMethodSections, "methods")),
    { id },
  );

  return {
    paymentMethodSections,
    paymentMethodById,
    paddingAfterBottomView,
    componentMap,
  };
}
