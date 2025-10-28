export interface LocationData {
  city: string;
  country: string;
  district: string;
  formattedAddress: string;
  isoCountryCode: string;
  name: string;
  postalCode: string;
  region: string;
  street: string;
  streetNumber: string;
  subregion: string;
  timezone: string;
}

export interface IApiResponse<T> {
  data: IApiData<T>;
  metaData: IApiMetaData;
}

export interface IApiData<T> {
  message: string;
  payload: Record<string, T>;
}
export interface IApiMetaData {
  error: string | null | object[] | Record<string, string>;
  executionTime?: number | null;
  errorCode: number | null;
}
export interface ISimplePaginated<T> {
  current_page: number | string | null;
  current_page_url: string;
  data: T;
  first_page_url: string | null;
  from: number | string | null;
  next_page_url: string | null;
  path: string;
  per_page: number | string | null;
  prev_page_url: string | null;
  to: number | string | null;
}
export type Setter<T> = (value: T) => void;
export type BootTask = () => Promise<void>;
