import { createSlice } from "@reduxjs/toolkit";
import { fetchRentProperties } from "./propertiesApi";

interface Listing {
  id: string;
  location: string;
  propertyTypes: string;
  price: number;
  listingType: "buy" | "rent";
}

interface ListingsState {
  listings: Listing[];
  location: string;
  propertyType: string;
  hasMoreRent: boolean
  priceRange: [number, number];
  loading: boolean;
  error: any;
  searchQuery: {
    location: string;
    priceMin: null | string;
    priceMax: null | string;
    propertyTypesValue: [];
  };
}

const initialState: ListingsState = {
  listings: [],
  location: "",
  propertyType: "",
  hasMoreRent: true,
  priceRange: [0, 1000000],
  loading: false,
  error: null,
  searchQuery: {
    location: "",
    priceMin: null,
    priceMax: null,
    propertyTypesValue: [],
  },
};

const rentListingsSlice = createSlice({
  name: "rentListings",
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
      .addCase(fetchRentProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRentProperties.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.listings = payload;
      })
      .addCase(fetchRentProperties.rejected, (state, { payload }) => {
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
} = rentListingsSlice.actions;

export default rentListingsSlice.reducer;
