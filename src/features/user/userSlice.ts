import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAuthorInfo,
  fetchOwnerPropertiesBuy,
  fetchOwnerPropertiesRent,
  fetchUserBuyWishlistProperties,
  fetchUserProperties,
  fetchUserPropertiesBuy,
  fetchUserPropertiesRent,
  fetchUserRentWishlistProperties,
} from "./userApi";

const initialState = {
  currentUser: null,
  token: null,
  userInfo: {},
  authorInfo: {},
  liked: false,
  loading: false,
  error: undefined,
  session: null,
  users: [],
  userId: null,
  buyProperties: [],
  rentProperties: [],
  hasMoreRent: true,
  hasMoreBuy: true,
  ownerBuyProperties: [],
  ownerRentProperties: [],
  ownerHasMoreRent: true,
  ownerHasMoreBuy: true,
  buyWishlistProperties: [],
  rentWishlistProperties: [],
  wishlistHasMoreRent: true,
  wishlistHasMoreBuy: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setSession(state, action) {
      state.session = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearBuyProperties: (state) => {
      state.buyProperties = [];
    },
    clearRentProperties: (state) => {
      state.rentProperties = [];
    },
    clearOwnerBuyProperties: (state) => {
      state.ownerBuyProperties = [];
    },
    clearOwnerRentProperties: (state) => {
      state.ownerRentProperties = [];
    },
    clearWishlistBuyProperties: (state) => {
      state.buyWishlistProperties = [];
    },
    clearWishlistRentProperties: (state) => {
      state.rentWishlistProperties = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProperties.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProperties.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(fetchUserProperties.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchUserPropertiesBuy.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUserPropertiesBuy.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.buyProperties = [...state.buyProperties, ...payload.properties];
      state.hasMoreBuy = payload.hasMore;
    });
    builder.addCase(fetchUserPropertiesBuy.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchUserPropertiesRent.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUserPropertiesRent.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.rentProperties = [...state.rentProperties, ...payload.properties];
      state.hasMoreRent = payload.hasMore;
    });
    builder.addCase(fetchUserPropertiesRent.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchOwnerPropertiesBuy.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchOwnerPropertiesBuy.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.ownerBuyProperties = [...state.ownerBuyProperties, ...payload.properties];
      state.ownerHasMoreBuy = payload.hasMore;
    });

    builder.addCase(fetchOwnerPropertiesBuy.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchOwnerPropertiesRent.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchOwnerPropertiesRent.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.ownerRentProperties = [...state.ownerRentProperties, ...payload.properties];
      state.ownerHasMoreRent = payload.hasMore;
    });

    builder.addCase(fetchOwnerPropertiesRent.rejected, (state, { payload }) => {
      state.loading = false;
    });


    builder.addCase(fetchUserBuyWishlistProperties.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUserBuyWishlistProperties.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.buyWishlistProperties = [...state.buyWishlistProperties, ...payload.wishlist];
      state.wishlistHasMoreBuy = payload.hasMore;
    });

    builder.addCase(fetchUserBuyWishlistProperties.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchUserRentWishlistProperties.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchUserRentWishlistProperties.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.rentWishlistProperties = [...state.rentWishlistProperties, ...payload.wishlist];
      state.wishlistHasMoreRent = payload.hasMore;
    });

    builder.addCase(fetchUserRentWishlistProperties.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchAuthorInfo.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthorInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.authorInfo = payload;
    });
    builder.addCase(fetchAuthorInfo.rejected, (state, { payload }) => {
      state.loading = false;
    });

  },
});

export const {
  setCurrentUser,
  setToken,
  setUserId,
  setSession,
  updateUserInfo,
  clearBuyProperties,
  clearRentProperties,
  clearOwnerBuyProperties,
  clearOwnerRentProperties,
  clearWishlistBuyProperties,
  clearWishlistRentProperties
} = userSlice.actions;
export default userSlice.reducer;
