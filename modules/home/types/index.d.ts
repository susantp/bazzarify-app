import { ReactElement } from "react";
import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/query-core";

export interface IHomeCard {
  id: string;
  component: ReactElement | undefined | null;
  title: string;
}
export interface IHomeCardComponent<T> {
  queryResult: UseQueryResult<T | null>;
}
export interface IHomeInfiniteCardComponent<T> {
  queryResult: UseInfiniteQueryResult<InfiniteData<T>, Error>;
}
