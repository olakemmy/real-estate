import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "@/lib/store";
import client from "../../lib/graphql";
import {
  GET_USER_PROPERTIES,
  GET_USER_PROPERTIES_DATA,
  GET_USER_WISHLIST_PROPERTIES,
} from "@/graphql/queries";
import { useDispatch } from "react-redux";

export const fetchUserProperties = createAsyncThunk(
  "user/fetchUserProperties",
  async (id: string) => {
    const variables = { id };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES,
      variables,
    });
    return data;
  }
);

export const fetchAuthorInfo = createAsyncThunk(
  "user/fetchAuthorInfo",
  async (id: string) => {
    const variables = { id };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES,
      variables,
    });
    return data;
  }
);



export const fetchUserPropertiesRent = createAsyncThunk(
  "userPropertiesBuy/fetchUserPropertiesRent",
  async ({ cursor, limit, listingType, userId }: {
    cursor?: string;
    limit: number;
    listingType: string;
    userId: string;
  }) => {
    const variables = { cursor, limit, listingType, userId };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES_DATA,
      variables,
    });
    return data.propertiesByUser;
  }
);

export const fetchUserPropertiesBuy = createAsyncThunk(
  "userPropertiesRent/fetchUserPropertiesRent",
  async ({ cursor, limit, listingType, userId }: {
    cursor?: string;
    limit: number;
    listingType: string;
    userId: string;
  }) => {
    const variables = { cursor, limit, listingType, userId };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES_DATA,
      variables,
    });
    return data.propertiesByUser;
  }
);

export const fetchOwnerPropertiesRent = createAsyncThunk(
  "ownerPropertiesRent/fetchOwnerPropertiesRent",
  async ({ cursor, limit, listingType, userId }: {
    cursor: string;
    limit: number;
    listingType: string;
    userId: string;
  }) => {
    const variables = { cursor, limit, listingType, userId };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES_DATA,
      variables,
    });
    return data.propertiesByUser;
  }
);

export const fetchOwnerPropertiesBuy = createAsyncThunk(
  "ownerPropertiesBuy/fetchOwnerPropertiesBuy",
  async ({ cursor, limit, listingType, userId }: {
    cursor: string;
    limit: number;
    listingType: string;
    userId: string;
  }) => {
    const variables = { cursor, limit, listingType, userId };
    const { data } = await client.query({
      query: GET_USER_PROPERTIES_DATA,
      variables,
    });
    return data.propertiesByUser;
  }
);

export const fetchUserRentWishlistProperties = createAsyncThunk(
  "wishlistPropertiesRent/fetchUserRentWishlistProperties",
  async ({
    wishlistCursor,
    wishlistLimit,
    propertyListingType,
    userId,
  }: {
    wishlistCursor?: string;
    wishlistLimit: number;
    propertyListingType: string;
    userId: string;
  }) => {
    const variables = {
      wishlistCursor,
      wishlistLimit,
      propertyListingType,
      userId,
    };
    const { data } = await client.query({
      query: GET_USER_WISHLIST_PROPERTIES,
      variables,
    });
    return data.wishlistByUser;
  }
);

export const fetchUserBuyWishlistProperties = createAsyncThunk(
  "wishlistPropertiesBuy/fetchUserBuyWishlistProperties",
  async ({
    wishlistCursor,
    wishlistLimit,
    propertyListingType,
    userId,
  }: {
    wishlistCursor?: string;
    wishlistLimit: number;
    propertyListingType: string;
    userId: string;
  }) => {
    const variables = {
      wishlistCursor,
      wishlistLimit,
      propertyListingType,
      userId,
    };
    const { data } = await client.query({
      query: GET_USER_WISHLIST_PROPERTIES,
      variables,
    });
    return data.wishlistByUser;
  }
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
