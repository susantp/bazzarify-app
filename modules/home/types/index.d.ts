import React from "react";
import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";

export interface IHomeCard {
  id: string;
  component: React.ReactNode;
  title: string;
}
export interface IHomeCardComponent<T> {
  queryResult: UseQueryResult<T, Error>;
}
export interface IHomeInfiniteCardComponent<T> {
  queryResult: UseInfiniteQueryResult<InfiniteData<T>, Error>;
}