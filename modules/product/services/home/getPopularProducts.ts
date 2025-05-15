import axiosInstance from "@/modules/core/utils/axios";
import { ItemProps } from "@/components";

export default async function getPopularProducts(): Promise<
  ItemProps[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getPopularProducts");
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    return response.data.data.payload.popularProducts;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("fetch popular products: ", error);
    // if (error instanceof AxiosError) {
    //   handleError(error);
    // }
    return null;
  }
}
