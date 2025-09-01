import { IImage } from "@/modules/product/types/image";

export interface IProduct {
  type: "retail" | "wholesale";
  uuid: string;
  image_base_path?: string;
  image_base_url?: string;
  id: string;
  name: string;
  slug: string;
  base_price: number;
  description?: string;
  highlights?: string;
  box_items?: string;
  status_text: string;
  status: number;
  specifications: Record<string, string>;
}

export interface IProductWithImage
  extends Omit<
    IProduct,
    | "id"
    | "box_items"
    | "specifications"
    | "highlights"
    | "status"
    | "description"
  > {
  images: IImage[];
}
