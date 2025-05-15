import axiosInstance from "@/modules/core/utils/axios";
import { ItemProps } from "@/components";

export default async function getFlashDealProducts(): Promise<
  ItemProps[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getFlashDealProducts");
    if (response.data?.metaData?.error) {
      console.log("check", response.data);
      return response.data.metaData;
    }
    return response.data.data.payload.flashDeals;
  } catch (error) {
    console.log(error);
    // if (error instanceof AxiosError) {
    //   handleError(error);
    // }
    return null;
  }
}
