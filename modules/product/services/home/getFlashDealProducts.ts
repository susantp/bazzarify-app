import axiosInstance from "@/modules/core/utils/axios";
import { ItemProps } from "@/components";
import { AxiosError } from "axios";

export default async function getFlashDealProducts(): Promise<
  ItemProps[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getFlashDealProducts");
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    return response.data.data.payload.flashDeals;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.request);
    }
    return null;
  }
}
