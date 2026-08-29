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
export interface IApiSchemaIssue {
  path: string;
  message: string;
  code: string;
}
export interface IApiMetaData {
  error: string | null | Record<string, unknown> | IApiSchemaIssue[];
  executionTime?: number | null;
  errorCode: number | null;
}

export type Setter<T> = (value: T) => void;
export type BootTask = () => Promise<void>;
