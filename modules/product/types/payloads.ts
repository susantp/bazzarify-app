import { IProductWithImage } from "@/modules/product/types/product";
import { ISimplePaginated } from "@/modules/core/types";
import { ICategoryListWithImage } from "@/modules/product/types/category";
import { TOmittedProductWithImages } from "@/modules/product/schemas/ProductSchema";

export interface IFlashDealsPayload {
  flashDeals: ISimplePaginated<IProductWithImage[]>;
}
export interface IPopularProductsPayload {
  popularProducts: ISimplePaginated<IProductWithImage[]>;
}
export interface IJustForYouProductsPayload {
  justForYouProducts: ISimplePaginated<TOmittedProductWithImages[]>;
}
export interface ICategoryListWithImagePayload {
  homeCategories: ISimplePaginated<ICategoryListWithImage[]>;
}
