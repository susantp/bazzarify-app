import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { usePortal } from "@/modules/portal/usePortal";
import { MapView } from "@/modules/core/components/MapView";
import {
  Coordinates as GeoCoordinates,
  reverseGeocode,
} from "@/modules/core/services/locationService";
import {
  addressDraftAtom,
  addressListAtom,
  getDefaultAddressAtom,
} from "@/modules/user/atoms/addresessAtom";
import { selectedDeliveryAddress } from "@/modules/cart/atoms";
import { TUserAddress } from "@/modules/user/schemas/UserAddress";
import { latitudeAtom, longitudeAtom } from "@/atoms/locationAtom";
import {
  formatUserAddress,
  mapGeocodeToAddressDraft,
} from "@/modules/user/utils/address";
import type { Coordinates as MapCoordinates } from "expo-maps";
import { LocationGeocodedAddress } from "expo-location";
import {
  fetchPlaceDetails,
  fetchPlaceSuggestions,
  PlaceSuggestion,
} from "@/modules/core/services/placesService";
import { authStatusAtom } from "@/modules/auth/atoms/authStatusAtom";
import { routeGuestToLoginForProtectedTarget } from "@/modules/core/utils/protectedNavigation";

interface Props {
  onClose?: () => void;
}

const DeliveryAddressPicker = ({ onClose }: Props) => {
  const authStatus = useAtomValue(authStatusAtom);
  const isAuthenticated = authStatus === "authenticated";
  const addresses = useAtomValue(addressListAtom) || [];
  const defaultAddress = useAtomValue(getDefaultAddressAtom);
  const [selectedAddress, setSelectedAddress] = useAtom(
    selectedDeliveryAddress,
  );
  const setAddressDraft = useSetAtom(addressDraftAtom);
  const currentLatitude = useAtomValue(latitudeAtom);
  const currentLongitude = useAtomValue(longitudeAtom);
  const { openPortal, closePortal } = usePortal();

  const handleSelect = (address: TUserAddress) => {
    setSelectedAddress(address);
    onClose?.();
  };

  const navigateToAddressCreate = async () => {
    if (isAuthenticated) {
      router.push("/account/setting/address/create");
      return;
    }
    await routeGuestToLoginForProtectedTarget(
      "/account/setting/address/create",
    );
  };

  const openCreateAddress = () => {
    onClose?.();
    navigateToAddressCreate().then(() => undefined);
  };

  const renderMapPortal = (coords?: MapCoordinates) => {
    const fallbackCoords =
      coords ||
      (currentLatitude && currentLongitude
        ? { latitude: currentLatitude, longitude: currentLongitude }
        : undefined);

    if (!fallbackCoords) {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Location unavailable",
        text2: "Enable location permissions to choose on map.",
      });
      return;
    }

    openPortal(() => (
      <LocationPickerPortal
        initialCoords={fallbackCoords}
        onClose={closePortal}
        onConfirm={handleMapConfirm}
      />
    ));
  };

  const handleMapConfirm = (addr?: LocationGeocodedAddress | null) => {
    if (!addr) {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Select a location first",
      });
      return;
    }
    setAddressDraft(mapGeocodeToAddressDraft(addr));
    closePortal();
    onClose?.();
    navigateToAddressCreate().then(() => undefined);
  };

  const activeAddress = selectedAddress || defaultAddress;

  return (
    <View className="flex-col gap-y-4 pb-4">
      <Text className="text-lg font-semibold">Select delivery address</Text>
      {addresses.length === 0 ? (
        <View className="flex-col gap-y-3">
          <Text className="text-sm text-gray-600">
            No saved address yet. Add a new address or pick on the map.
          </Text>
          <View className="flex-row gap-x-3">
            <TouchableOpacity
              className="rounded-full bg-primary px-4 py-2"
              onPress={openCreateAddress}
            >
              <Text className="text-white">Create address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full border border-gray-300 px-4 py-2"
              onPress={() => renderMapPortal()}
            >
              <Text>Use current location</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.uuid}
            contentContainerStyle={{ rowGap: 12 }}
            renderItem={({ item }) => {
              const isSelected = activeAddress?.uuid === item.uuid;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className={`rounded-lg border p-3 ${
                    isSelected ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <Text className="text-sm font-semibold">
                    {formatUserAddress(item)}
                  </Text>
                  <View className="mt-1 flex-row gap-x-2">
                    {item.is_default ? (
                      <Text className="text-xs text-green-600">Default</Text>
                    ) : null}
                    {isSelected ? (
                      <Text className="text-xs text-primary">Selected</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View className="flex-row items-center justify-between pt-2">
            <TouchableOpacity
              className="rounded-full bg-primary px-4 py-2"
              onPress={openCreateAddress}
            >
              <Text className="text-white">Create new address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full border border-gray-300 px-4 py-2"
              onPress={() => renderMapPortal()}
            >
              <Text>Use current location</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {!addresses.length && currentLatitude === null ? (
        <ActivityIndicator size="small" color="#999" />
      ) : null}
    </View>
  );
};

export default DeliveryAddressPicker;

const LocationPickerPortal = ({
  initialCoords,
  onClose,
  onConfirm,
}: {
  initialCoords: MapCoordinates;
  onClose: () => void;
  onConfirm: (addr?: LocationGeocodedAddress | null) => void;
}) => {
  const [coords, setCoords] = useState<MapCoordinates>(initialCoords);
  const [currentAddress, setCurrentAddress] =
    useState<LocationGeocodedAddress | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlaceSuggestion[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedCoords =
    coords.latitude != null && coords.longitude != null
      ? ({
          latitude: coords.latitude,
          longitude: coords.longitude,
        } satisfies GeoCoordinates)
      : null;

  useEffect(() => {
    if (!normalizedCoords) {
      setCurrentAddress(null);
      return;
    }

    reverseGeocode(normalizedCoords)
      .then((result) => setCurrentAddress(result))
      .catch(() => setCurrentAddress(null));
  }, [normalizedCoords]);

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }
    if (trimmed.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }
    setSearchLoading(true);
    searchTimer.current = setTimeout(() => {
      fetchPlaceSuggestions(trimmed, normalizedCoords ?? undefined)
        .then((results) => {
          setSearchResults(results);
          setSearchError(null);
        })
        .catch((error) => {
          setSearchResults([]);
          setSearchError(error?.message || "Search failed");
          Toast.show({
            position: "bottom",
            type: "error",
            text1: "Search failed",
            text2: error?.message || "Please try again.",
          });
        })
        .finally(() => setSearchLoading(false));
    }, 350);
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, [searchQuery, normalizedCoords]);

  const handleMapTap = (event: { coordinates: MapCoordinates }) => {
    const { coordinates } = event;
    if (!coordinates.latitude || !coordinates.longitude) return;
    setCoords(coordinates);
  };

  const handleSearchSelect = async (placeId: string) => {
    try {
      setSearchLoading(true);
      const details = await fetchPlaceDetails(placeId);
      setCoords(details.coordinates);
      setSearchResults([]);
      if (details.formattedAddress) {
        setSearchQuery(details.formattedAddress);
      } else {
        setSearchQuery("");
      }
    } catch (error: any) {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Unable to load address",
        text2: error?.message || "Please try again.",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <MapView
      selectedAddress={currentAddress?.formattedAddress ?? "Tap on map to pick"}
      helperText="Tap on map or search to pick a delivery location"
      onConfirm={() => onConfirm(currentAddress)}
      onClose={onClose}
      cameraPosition={{
        coordinates: coords,
        zoom: 16,
      }}
      markers={[
        {
          coordinates: coords,
          title: "Selected location",
          draggable: true,
          snippet: currentAddress?.formattedAddress || undefined,
        },
      ]}
      onClick={handleMapTap}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchResults={searchResults}
      onSearchResultPress={handleSearchSelect}
      searchLoading={searchLoading}
      searchError={searchError}
    />
  );
};
