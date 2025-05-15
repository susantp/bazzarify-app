import { ItemProps } from "@/components";
import axiosInstance from "@/modules/core/utils/axios";

export default async function getProductBySlug(
  slug: string,
): Promise<ItemProps | null> {
  try {
    const response = await axiosInstance.get(`/product/${slug}`);
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    return response.data.data.payload.product;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    // if (error instanceof AxiosError) {
    //   handleError(error);
    // }
    return null;
  }
}
