import { useQuery } from "@tanstack/react-query";
import getProductByUUID from "@/modules/product/services/product/getProductByUUID";
import { useEffect, useState } from "react";
import { TVariantListWithImage } from "@/modules/product/schemas/VariantSchema";
import { usePortal } from "@/modules/portal/usePortal";
import { MapView } from "@/modules/core/components/MapView";
import { reverseGeocode } from "@/modules/core/services/locationService";
import { Coordinates } from "expo-maps";
import { useAtom, useAtomValue } from "jotai";
import {
  geocodeAddressAtom,
  latitudeAtom,
  longitudeAtom,
} from "@/atoms/locationAtom";
import { LocationGeocodedAddress } from "expo-location";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";

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
  const [chosenAddress, setChosenAddress] = useAtom(selectedDeliveryAddress);
  const currentLatitude = useAtomValue(latitudeAtom);
  const currentLongitude = useAtomValue(longitudeAtom);
  const [chosenCoordinates, setChosenCoordinates] = useState<Coordinates>();
  const currentAddress = useAtomValue(geocodeAddressAtom);

  const renderMapPortal = (
    coords?: Coordinates,
    addr?: LocationGeocodedAddress | null,
  ) => {
    const fallbackCoords =
      coords ||
      chosenCoordinates ||
      (currentLatitude && currentLongitude
        ? { latitude: currentLatitude, longitude: currentLongitude }
        : undefined);

    if (!fallbackCoords) return;

    openPortal(() => (
      <MapView
        selectedAddress={
          addr?.formattedAddress ??
          chosenAddress?.formattedAddress ??
          "Fetching address..."
        }
        onConfirm={() => closePortal()}
        onClose={closePortal}
        cameraPosition={{
          coordinates: fallbackCoords,
          zoom: 16,
        }}
        markers={[
          {
            coordinates: fallbackCoords,
            title: "You are here",
            draggable: true,
            snippet:
              addr?.formattedAddress ||
              chosenAddress?.formattedAddress ||
              undefined,
          },
        ]}
        onClick={handleMapTap}
      />
    ));
  };

  const handleMapTap = (event: { coordinates: Coordinates }) => {
    const { coordinates } = event;
    if (coordinates.latitude && coordinates.longitude) {
      reverseGeocode({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }).then((result) => {
        setChosenCoordinates(coordinates);
        setChosenAddress(result);
        renderMapPortal(coordinates, result);
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
    chosenAddress,
    currentLatitude,
    currentLongitude,
    chosenCoordinates,
    handleMapTap,
    renderMapPortal,
    currentAddress,
  };
}
