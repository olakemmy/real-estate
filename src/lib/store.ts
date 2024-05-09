import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import propertiesSlice from "../features/properties/propertiesSlice";
import userSlice from "../features/user/userSlice";
import buyListingsSlice from "../features/properties/buyListingsSlice";
import rentListingsSlice from "@/features/properties/rentListingsSlice";
import imageSlice from "@/features/images/imageSlice";

const rootReducer = combineReducers({
  properties: propertiesSlice,
  user: userSlice,
  buyListings: buyListingsSlice,
  rentListings: rentListingsSlice,
  images: imageSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export { store };
export const persistor = persistStore(store);

