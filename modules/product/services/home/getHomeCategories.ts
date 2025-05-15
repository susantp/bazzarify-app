import axiosInstance from "@/modules/core/utils/axios";
import { CategoriesItemData } from "@/constants/categoriesItemData";

export default async function getHomeCategories(): Promise<
  CategoriesItemData[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getHomeCategories");
    if (response.data?.metaData?.error) {
      throw new Error(response.data.metaData);
    }
    return response.data.data.payload.homeCategories;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("getHomeCategories: ", error);
    // if (error instanceof AxiosError) {
    //   handleError(error);
    // }
    return null;
  }
}
