import { IProductWithImage } from "@/modules/product/types/product";
import { ISimplePaginated } from "@/modules/core/types";
import { ICategoryListWithImage } from "@/modules/product/types/category";

export interface IFlashDealsPayload {
  flashDeals: ISimplePaginated<IProductWithImage[]>;
}
export interface IPopularProductsPayload {
  popularProducts: ISimplePaginated<IProductWithImage[]>;
}
export interface IJustForYouProductsPayload {
  justForYouProducts: ISimplePaginated<IProductWithImage[]>;
}
export interface ICategoryListWithImagePayload {
  homeCategories: ISimplePaginated<ICategoryListWithImage[]>;
}
