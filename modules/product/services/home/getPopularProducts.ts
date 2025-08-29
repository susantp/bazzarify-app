import axiosInstance from "@/modules/core/utils/axios";
import { ItemProps } from "@/components";
import { AxiosError } from "axios";

export default async function getPopularProducts(): Promise<
  ItemProps[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getPopularProducts");
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    return response.data.data.payload.popularProducts;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("fetching popular products: ", error.request);
    }
    return null;
  }
}
