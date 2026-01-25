import Constants from "expo-constants";
import { Coordinates } from "@/modules/core/services/locationService";

export type PlaceSuggestion = {
  id: string;
  title: string;
  subtitle?: string;
};

const getGoogleMapsApiKey = () => {
  const config = Constants.expoConfig;
  return (
    config?.extra?.googleMapsApiKey ||
    config?.android?.config?.googleMaps?.apiKey ||
    config?.ios?.config?.googleMaps?.apiKey ||
    ""
  );
};

const buildQuery = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
};

export const fetchPlaceSuggestions = async (
  query: string,
  coords?: Coordinates,
): Promise<PlaceSuggestion[]> => {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    throw new Error("Google Maps API key missing");
  }
  const params: Record<string, string> = {
    input: query,
    key: apiKey,
    types: "address",
  };
  if (coords) {
    params.location = `${coords.latitude},${coords.longitude}`;
    params.radius = "50000";
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${buildQuery(
    params,
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.status !== "OK") {
    const message = data?.error_message || data?.status || "Unknown error";
    throw new Error(message);
  }
  return (data.predictions || []).map((prediction: any) => ({
    id: prediction.place_id,
    title: prediction.structured_formatting?.main_text || prediction.description,
    subtitle:
      prediction.structured_formatting?.secondary_text ||
      prediction.description,
  }));
};

export const fetchPlaceDetails = async (placeId: string) => {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    throw new Error("Google Maps API key missing");
  }
  const params = buildQuery({
    place_id: placeId,
    key: apiKey,
    fields: "geometry,formatted_address",
  });
  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.status !== "OK") {
    const message = data?.error_message || data?.status || "Unknown error";
    throw new Error(message);
  }
  const location = data?.result?.geometry?.location;
  if (!location) {
    throw new Error("Location not found");
  }
  return {
    coordinates: {
      latitude: location.lat,
      longitude: location.lng,
    },
    formattedAddress: data?.result?.formatted_address as string | undefined,
  };
};
