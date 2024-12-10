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
  classes: string;
};
type SearchBoxProps = {
  classes: string;
};
type HeaderIconsProps = {
  classes: string;
};
