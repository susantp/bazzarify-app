import { useQuery } from "@tanstack/react-query";
import getProductByUUID from "@/modules/product/services/product/getProductByUUID";
import { useEffect, useState } from "react";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { usePortal } from "@/modules/portal/usePortal";
import { MapView } from "@/modules/core/components/MapView";
import { reverseGeocode } from "@/modules/core/services/locationService";
import { Coordinates } from "expo-maps";
import { useAtomValue } from "jotai";
import { latitudeAtom, longitudeAtom } from "@/atoms/locationAtom";
import { LocationGeocodedAddress } from "expo-location";

export interface IProductVariantSelectorProps {
  variants: TVariantListWithImage[];
  onPress: (variant: TVariantListWithImage) => void;
  selectedVariant: TVariantListWithImage | undefined;
}

export default function useProductScreen(uuid: string) {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryFn: () => getProductByUUID(uuid.toString()),
    queryKey: ["product", uuid],
  });
  const [selectedVariant, setSelectedVariant] = useState<
    TVariantListWithImage | undefined
  >();
  const handleVariantChange = (variant: TVariantListWithImage) => {
    setSelectedVariant(variant);
  };
  const { openPortal, closePortal } = usePortal();
  const [address, setAddress] = useState<LocationGeocodedAddress | null>(null);
  const currentLatitude = useAtomValue(latitudeAtom);
  const currentLongitude = useAtomValue(longitudeAtom);
  const [chosenCoordinates, setChosenCoordinates] = useState<Coordinates>();

  const handleMapTap = (event: { coordinates: Coordinates }) => {
    const { coordinates } = event;
    if (coordinates.latitude && coordinates.longitude) {
      reverseGeocode({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }).then((result) => {
        setChosenCoordinates(coordinates);
        setAddress(result);
      });
    }
  };

  useEffect(() => {
    setSelectedVariant(data?.product?.variants?.at(0) || undefined);
  }, [data?.product, isSuccess]);

  return {
    isSuccess,
    isLoading,
    isError,
    error,
    product: data?.product,
    currency: data?.currency,
    handleVariantChange,
    selectedVariant,
    openPortal,
    closePortal,
    address,
    currentLatitude,
    currentLongitude,
    chosenCoordinates,
    handleMapTap,
  };
}
