export type ItemVariant = {
  name: string;
  stock: string;
  available: string;
};
export type ItemProps = {
  id: string;
  slug: string;
  uuid: string;
  name: string;
  price: number;
  rating?: number;
  discount?: number;
  freeDelivery?: boolean;
  base_price?: {
    amount: string;
    currency: string;
  };
  variants?: ItemVariant[];
  location: string;
  specialSale?: {
    discount: number;
    discountType: "flat" | "percent";
    endDate: string;
    name: string;
  };
};

export type titleKey =
  | "Flash Deals"
  | "Popular Items"
  | "Just for you"
  | "Categories";

type HeaderProps = {
  className: string;
};
type SearchBoxProps = {
  className: string;
};
type HeaderIconsProps = {
  className: string;
};
