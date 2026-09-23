export type ItemVariant = {
  uuid: string;
  name: string;
  stock: string;
  price: ItemPrice;
  images: ItemImage[];
  available: string;
};
export type ItemPrice = {
  amount: number;
  currency: string;
};
export type ItemImage = {
  uuid: string;
  path: string;
  s3_path_url: string;
  thumbnailUrl: string;
};
export type ItemSpecialSale = {
  discount: number;
  discountType: "flat" | "percent";
  endDate: string;
  name: string;
};
export type ItemProps = {
  images?: ItemImage[];
  id: string;
  slug: string;
  uuid: string;
  name: string;
  price: number;
  rating?: number;
  discount?: number;
  freeDelivery?: boolean;
  base_price: ItemPrice;
  variants?: ItemVariant[];
  location: string;
  specialSale?: ItemSpecialSale;
};

export type titleKey =
  "Flash Deals" | "Popular Items" | "Just for you" | "Categories";
