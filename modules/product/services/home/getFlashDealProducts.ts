import axiosInstance from "@/modules/core/utils/axios";
import { ItemProps } from "@/components";

export default async function getFlashDealProducts(): Promise<
  ItemProps[] | null
> {
  try {
    const response = await axiosInstance.get("/home/getFlashDealProducts");
    if (response.data?.metaData?.error) {
      return response.data.metaData;
    }
    console.log("flashDeals: ", response.data);
    return response.data.data.payload.flashDeals;
  } catch (error) {
    console.log("fetching popular products:", error);
    return null;
  }
}
