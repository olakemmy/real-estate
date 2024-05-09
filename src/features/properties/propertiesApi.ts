import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "@/lib/store";
import client from "../../lib/graphql";
import {
  GET_ALL_BUY_PROPERTIES,
  GET_ALL_RENT_PROPERTIES,
  GET_AllProperties,
  Get_Property,
} from "../../graphql/queries";
import { useDispatch } from "react-redux";

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    const { data } = await client.query({
      query: GET_AllProperties,
    });
    return data.allProperties;
  }
);

export const fetchProperty = createAsyncThunk(
  "property/fetchProperty",
  async (id: string) => {
    const variables = { id };
    const { data } = await client.query({
      query: Get_Property,
      variables,
    });
    return data.property;
  }
);

export const fetchBuyProperties = createAsyncThunk(
  "buyProperties/fetchBuyProperties",
  async (listingType: string) => {
    const variables = { listingType };
    const { data } = await client.query({
      query: GET_ALL_BUY_PROPERTIES,
      variables,
    });
    return data.properties;
  }
);

export const fetchRentProperties = createAsyncThunk(
  "rentProperties/fetchRentProperties",
  async (listingType: string) => {
    const variables = { listingType };
    const { data } = await client.query({
      query: GET_ALL_RENT_PROPERTIES,
      variables,
    });
    return data.properties;
  }
);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
