export type AddressType = {
  id: string;
  label: string;
  default: boolean;
};
export const addressList: AddressType[] = [
  {
    id: "biratnagar",
    label: "Biratnagar, Morang, Nepal",
    default: true,
  },
  {
    id: "kathmandu",
    label: "Kathmandu, Bagmati, Nepal",
    default: false,
  },
  {
    id: "janakpur",
    label: "Janakpur, Janakpur, Nepal",
    default: false,
  },
];
