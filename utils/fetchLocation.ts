export const fetchLocation = async (lat: number, long: number) => {
  const baseUrl = `https://api-bdc.net/data/reverse-geocode-client`;
  const url = new URL(baseUrl);
  url.searchParams.append("latitude", lat.toString());
  url.searchParams.append("longitude", long.toString());
  url.searchParams.append("localityLanguage", "en");
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }
  return (await response.json()) as LocationData;
};

export interface LocationData {
  latitude: number;
  longitude: number;
  lookupSource: string;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
}
