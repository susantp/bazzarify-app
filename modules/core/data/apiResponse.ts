import { IApiResponse, IData, IMetaData } from "@/modules/core/data/index";

export function setResponse<T>({ data, metaData }: IApiResponse<T>) {
  return {
    data: data,
    metaData: metaData,
  };
}

export function setDataResponse<T>(data: IData<T>): IApiResponse<T> {
  return setResponse({ data, metaData: { error: null, errorCode: 200 } });
}

export function setMetaDataResponse(metaData: IMetaData): IApiResponse<object> {
  return setResponse({ data: { message: "", payload: {} }, metaData });
}
