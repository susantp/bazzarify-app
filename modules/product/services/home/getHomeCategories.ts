import axiosInstance from "@/modules/core/utils/axios";
import { CategoriesItemData } from "@/constants/categoriesItemData";
import { AxiosError } from "axios";

export default async function getHomeCategories(): Promise<
  CategoriesItemData[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getHomeCategories");
    if (response.data?.metaData?.error) {
      throw new Error(response.data.metaData);
    }
    return response.data.data.payload.homeCategories;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.request);
    }
    return null;
  }
}
