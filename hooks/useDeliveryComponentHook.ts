import { useRecoilValue } from "recoil";
import { locationAtom } from "@/atoms/locationAtom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLocation } from "@/utils/fetchLocation";

export const useDeliveryComponentHook = () => {
  const location = useRecoilValue(locationAtom);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "fetchLocation",
      location?.coords.latitude,
      location?.coords.longitude,
    ],
    queryFn: () =>
      fetchLocation(location?.coords.latitude!, location?.coords.longitude!),
    enabled: Boolean(location?.coords),
    retry: false,
  });
  const msg = isLoading
    ? "Loading..."
    : isError
      ? "Error while retrieving location"
      : data?.city
        ? `Deliver to ${data.locality}, ${data.city}`
        : "Unable to fetch location";

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prev: number) => prev + 1);
      refetch().catch((err: Error) => console.log(err));
    }
  };
  return { location, handleRetry, msg, isError, isLoading, refetch };
};
