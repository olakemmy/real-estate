import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProperties, fetchProperty } from "./propertiesApi";

interface Price {
  min: number;
  max: number;
}

interface SearchQuery {
  location: string;
  priceMin: number | null;
  priceMax: number | null;
  propertyTypes: string[];
}

interface Property {
  title: string;
  propertyType: string;
  location: string;
  price: Price;
  amenities: string[];
  status: string;
  bathrooms: string;
  bedrooms: string;
  garages: string;
  yearBuilt: string;
  length: number;
}

interface PropertiesState {
  data: Property[];
  propertyData: Property | null;
  loading: boolean;
  error: any;
  searchQuery: SearchQuery;
  property: Property;
  selectedListingId: number | null;
  searchActiveTab: string;
}

const initialState = {
  title: "",
  propertyType: "",
  location: "",
  price: {
    min: 0,
    max: 0,
  },
  amenities: [],
  status: "",
  bathrooms: "",
  bedrooms: "",
  garages: "",
  yearBuilt: "",
  length: 0,
  data: [],
  propertyData: null,
  loading: false,
  error: undefined,
  searchQuery: {
    location: "",
    priceMin: null,
    priceMax: null,
    propertyTypes: [],
  },
  property: {},
  wishlist: [],
  selectedListingId: null,
  searchActiveTab: "Buy",
  isLiked: false,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setSearchActiveTab(state, action) {
      state.searchActiveTab = action.payload;
    },
    setSelectedListing(state, action) {
      state.selectedListingId = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setIsLiked(state, action) {
      state.isLiked = action.payload;
    },
    setProperty(state, action) {
      state.property = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },

    addPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addPrice: (state, action) => {
      state.price.min = action.payload.min;
      state.price.max = action.payload.max;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state, { payload }) => {
        state.loading = true;
        if (payload !== null) {
          state.error = payload;
        }
      })
      .addCase(fetchProperties.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchProperties.rejected, (state, { payload }) => {
        state.loading = false;
        // if (payload !== null) {
        //   state.error = payload;
        // }
      })
      .addCase(fetchProperty.pending, (state, { payload }) => {
        state.loading = true;
        if (payload !== null) {
          state.error = payload;
        }
      })
      .addCase(fetchProperty.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.property = payload;
      })
      .addCase(fetchProperty.rejected, (state, { payload }) => {
        state.loading = false;
        // if (payload !== null) {
        //   state.error = payload;
        // }
      });
  },
});

export const {
  addPropertyType,
  addLocation,
  addPrice,
  setProperty,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedListing,
  setSearchActiveTab,
  setWishlist,
  setIsLiked,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
