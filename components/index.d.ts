export type ItemProps = {
  id: string;
  name: string;
  price?: number;
  rating?: number;
  discount?: number;
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
