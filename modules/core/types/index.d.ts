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

export type Setter<T> = (value: T) => void;
export type BootTask = () => Promise<void>;
