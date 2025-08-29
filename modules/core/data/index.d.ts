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

export interface IData<T> {
  message: string;
  payload: T;
}

export interface IMetaData {
  error: string | null;
  errorCode?: number;
}

export interface IApiResponse<T> {
  data: IData<T>;
  metaData: IMetaData;
}
