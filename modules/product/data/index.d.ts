export type TProduct = {
  type: "retail" | "wholesale";
  uuid: string;
  image_base_path?: string;
  image_base_url?: string;
  id: string;
  name: string;
  slug: string;
  base_price: string;
  description?: string;
  highlights?: string;
  box_items?: string;
  category: TCategory;
  images: TImage[];
  specifications: Record<string, string>;
  variants: TVariant[];
};
