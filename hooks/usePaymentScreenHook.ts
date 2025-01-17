import { Href } from "expo-router";

export type TPaymentMethodType = {
  sectionTitle: string;
  methods: PaymentMethodType[];
};
export type PaymentMethodType = {
  name: string;
  icon: string;
  pathname: Href;
  id: string;
};
export default function usePaymentScreenHook() {
  const paymentMethodTypes: TPaymentMethodType[] = [
    {
      sectionTitle: "Recommended Method",
      methods: [
        {
          id: "card",
          name: "Credit/Debit card payment",
          icon: "credit_card_icon",
          pathname: "/cart/cardPayment",
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
          pathname: "/cart/cardPayment",
        },
        {
          id: "connectIPS",
          name: "Connect IPS",
          icon: "connect_ips_icon",
          pathname: "/cart/cardPayment",
        },
      ],
    },
    {
      sectionTitle: "Recommended Method",
      methods: [
        {
          id: "cod",
          name: "Cash On Delivery (COD)",
          icon: "cash_on_delivery_icon",
          pathname: "/cart/cardPayment",
        },
      ],
    },
  ];

  return { paymentMethodTypes };
}
