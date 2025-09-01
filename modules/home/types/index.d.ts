import { ReactElement } from "react";
import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";

export interface IHomeCard {
  id: string;
  component: ReactElement;
  title: string;
}
export interface IHomeCardComponent<T> {
  queryResult: UseQueryResult<T, Error>;
}
export interface IHomeInfiniteCardComponent<T> {
  queryResult: UseInfiniteQueryResult<InfiniteData<T>, Error>;
}
