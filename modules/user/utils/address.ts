import { LocationGeocodedAddress } from "expo-location";
import {
  TUserAddress,
  TUserAddressCreate,
} from "@/modules/user/schemas/UserAddress";

export const formatUserAddress = (address?: TUserAddress | null) => {
  if (!address) return "";
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zip,
    address.country,
  ].filter(Boolean);
  return parts.join(", ");
};

export const findMatchingAddress = (
  addresses: TUserAddress[] | null | undefined,
  payload: TUserAddressCreate,
): TUserAddress | null => {
  if (!addresses || addresses.length === 0) return null;
  const match = addresses.find(
    (address) =>
      address.street === payload.street &&
      address.city === payload.city &&
      address.state === payload.state &&
      address.zip === payload.zip &&
      address.country === payload.country &&
      address.phone === payload.phone,
  );
  return match || addresses.at(-1) || null;
};

export const mapGeocodeToAddressDraft = (
  geocode: LocationGeocodedAddress,
): Partial<TUserAddressCreate> => {
  const streetParts = [geocode.streetNumber, geocode.street].filter(Boolean);
  const street =
    streetParts.join(" ") ||
    geocode.name ||
    geocode.district ||
    geocode.subregion ||
    "";
  const city = geocode.city || geocode.district || geocode.subregion || "";
  const state = geocode.region || geocode.subregion || "";
  const zip = geocode.postalCode || "";
  const country = geocode.country || "";
  return {
    street,
    city,
    state,
    zip,
    country,
  };
};
