import { Href } from "expo-router";
import _ from "underscore";
import { useMemo } from "react";

export type TPaymentMethodType = {
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
  const paymentMethodTypes: TPaymentMethodType[] = useMemo(
    () => [
      {
        sectionTitle: "Recommended Method",
        methods: [
          {
            id: "card",
            name: "Card payment",
            icon: "credit_card_icon",
            pathname: "/cart/paymentScreen/card",
          },
        ],
      },
      {
        sectionTitle: "Digital Payment Method",
        methods: [
          {
            id: "imePay",
            name: "Ime pay",
            icon: "ime_pay_icon",
            pathname: "/cart/paymentScreen/[card]",
          },
          {
            id: "connectIPS",
            name: "Connect IPS",
            icon: "connect_ips_icon",
            pathname: "/cart/paymentScreen/[card]",
          },
        ],
      },
      {
        sectionTitle: "Recommended Method",
        methods: [
          {
            id: "cod",
            name: "Cash On Delivery",
            icon: "cash_on_delivery_icon",
            pathname: "/cart/paymentScreen/cod",
            voucherMsg:
              "Ensure you have collected the payment voucher to get Bank and Wallet Discounts. 0% EMI available on selected bank partners.",
          },
        ],
      },
    ],
    [],
  );
  const paymentMethodById: PaymentMethodType | undefined = useMemo(
    () => _.find(_.flatten(_.pluck(paymentMethodTypes, "methods")), { id }),
    [id, paymentMethodTypes],
  );

  return { paymentMethodTypes, paymentMethodById };
}
