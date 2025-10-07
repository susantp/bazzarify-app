import { Href, router } from "expo-router";
import _ from "underscore";
import React from "react";
import CardPaymentComponent from "@/components/cart/payment/CardPaymentComponent";
import BottomActionView from "@/components/common/BottomActionView";
import CardPaymentBottomActionView from "@/components/cart/payment/CardPaymentBottomActionView";
import CODPaymentComponent from "@/components/cart/payment/CODPaymentComponent";
import CODPaymentBottomActionView from "@/components/cart/payment/CODPaymentBottomActionView";
import ImePayPaymentComponent from "@/components/cart/payment/ImePayPaymentComponent";
import ImePayPaymentBottomActionView from "@/components/cart/payment/ImePayPaymentBottomActionView";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { orderTotalsAfterOrderCreation } from "@/modules/order/atoms/orderTotalsAfterOrderCreation";
import { cartAtom } from "@/modules/cart/atoms";
import { userAtom } from "@/modules/auth/atoms/userAtom";
import { getDefaultAddressAtom } from "@/modules/user/atoms/addresessAtom";
import actionPlaceOrder from "@/modules/checkout/actions/actionPlaceOrder";

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
  const [cartState, setCartState] = useAtom(cartAtom);
  const setOrderTotals = useSetAtom(orderTotalsAfterOrderCreation);
  const user = useAtomValue(userAtom);
  const defaultDeliveryAddress = useAtomValue(getDefaultAddressAtom);

  const orderTotals = useAtomValue(orderTotalsAfterOrderCreation);
  const codPaymentFee = 10;
  const handleCODPayment = async () => {
    if (!defaultDeliveryAddress) return null;
    const response = await actionPlaceOrder({
      shippingInformation: {
        ...defaultDeliveryAddress,
        phone: user?.phone || "0000000000",
        name: user?.name || "No Name",
      },
    });
    if (response?.cart === null) {
      setCartState(response?.cart);
    }
    setOrderTotals(response?.orderTotals || null);
    router.replace("/");
  };

  const componentMap: Record<PaymentMethodType["id"], React.ReactNode> = {
    card: (
      <>
        <CardPaymentComponent />
        <BottomActionView>
          <CardPaymentBottomActionView
            totalPrice={399}
            subTotalPrice={399}
            actionBtn="Confirm Order"
          />
        </BottomActionView>
      </>
    ),
    cod: (
      <>
        <CODPaymentComponent />
        <BottomActionView>
          <CODPaymentBottomActionView
            action={handleCODPayment}
            actionBtn="Confirm Order"
            cashPaymentFee={10}
            totalPrice={(orderTotals?.grand_total || 0) + codPaymentFee}
            subTotalPrice={orderTotals?.grand_total || 0}
          />
        </BottomActionView>
      </>
    ),
    imePay: (
      <>
        <ImePayPaymentComponent />
        <BottomActionView>
          <ImePayPaymentBottomActionView
            totalPrice={323}
            subTotalPrice={323}
            actionBtn={"Confirm Order"}
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
    componentMap,
    orderTotals,
  };
}
