import { createSlice } from "@reduxjs/toolkit";
import { fetchBuyProperties } from "./propertiesApi";

interface Listing {
  id: string;
  location: string;
  propertyType: string;
  price: number;
  listingType: "buy" | "rent";
}

interface ListingsState {
  listings: Listing[];
  location: string;
  propertyType: string;
  hasMoreBuy: boolean;
  priceRange: [number, number];
  loading: boolean;
  error: any;
  searchQuery: {
    location: string;
    priceMin: null | string;
    priceMax: null | string;
    propertyTypes: [];
  };
}

const initialState: ListingsState = {
  listings: [],
  location: "",
  propertyType: "",
  hasMoreBuy: true,

  priceRange: [0, 1000000],
  loading: true,
  error: null,
  searchQuery: {
    location: "",
    priceMin: null,
    priceMax: null,
    propertyTypes: [],
  },
};

const buyListingsSlice = createSlice({
  name: "buyListings",
  initialState,
  reducers: {
    setListings(state, action) {
      state.listings = action.payload;
    },
    clearListings(state) {
      state.listings = [];
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setPropertyType(state, action) {
      state.propertyType = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuyProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyProperties.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.listings = payload;
      })
      .addCase(fetchBuyProperties.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setListings,
  setLocation,
  setPropertyType,
  setPriceRange,
  setSearchQuery,
  clearListings,
} = buyListingsSlice.actions;

export default buyListingsSlice.reducer;
