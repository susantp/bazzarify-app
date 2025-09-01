import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";

export interface IHomeCards<T> {
  queryResult: UseQueryResult<T, Error>;
}
export interface IHomeInfiniteCards<T> {
  queryResult: UseInfiniteQueryResult<InfiniteData<T>, Error>;
}
