export type NotificationSettingType = {
  id: string;
  label: string;
  helperText: string;
  active: boolean;
};
export const notificationSettingList: NotificationSettingType[] = [
  {
    id: "promotion",
    label: "Promotion",
    helperText: "Be the first to discover our exclusive upcoming deals",
    active: false,
  },
  {
    id: "order",
    label: "Order",
    helperText: "Stay updated on your order status",
    active: false,
  },
  {
    id: "engagements",
    label: "Engagements",
    helperText:
      "Stay informed about price drops, updates, and in-app events events events",
    active: false,
  },
  {
    id: "sellerOffers",
    label: "Seller offers",
    helperText: "Stay updated on promotions and vouchers from sellers",
    active: false,
  },
  {
    id: "message",
    label: "Message",
    helperText: "Get notified when you receive private messages",
    active: false,
  },
  {
    id: "emails",
    label: "Emails",
    helperText: "Receive newsletters and top recommendations",
    active: false,
  },
  {
    id: "sms",
    label: "SMS",
    helperText: "Get exclusive offers and deals directly via SMS",
    active: false,
  },
  {
    id: "whatsapp",
    label: "Whatsapp",
    helperText: "Get promo updates directly on WhatsApp",
    active: false,
  },
];
