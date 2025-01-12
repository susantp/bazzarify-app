export type TPaymentType = {
  sectionTitle: string;
  methods: PaymentMethodType[];
};
export type PaymentMethodType = {
  name: string;
  icon: string;
  action: string;
  id: string;
};
export default function usePaymentScreenHook() {
  const paymentTypes: TPaymentType[] = [
    {
      sectionTitle: "Recommended Method",
      methods: [
        {
          id: "card",
          name: "Credit/Debit card payment",
          icon: "credit_card_icon",
          action: "navigateToCardPayment",
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
          action: "navigateToImePay",
        },
        {
          id: "connectIPS",
          name: "Connect IPS",
          icon: "connect_ips_icon",
          action: "navigateToConnectIps",
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
          action: "navigateToCashOnDelivery",
        },
      ],
    },
  ];

  return { paymentTypes };
}
