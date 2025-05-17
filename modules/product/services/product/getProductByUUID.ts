import { ItemProps } from "@/components";
import axiosInstance from "@/modules/core/utils/axios";

export default async function getProductByUUID(
  uuid: string,
): Promise<ItemProps | null> {
  try {
    const response = await axiosInstance.get(`/product/${uuid}`);
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    return response.data.data.payload.product;
  } catch (error) {
    console.log(error);
    // if (error instanceof AxiosError) {
    //   handleError(error);
    // }
    return null;
  }
}
