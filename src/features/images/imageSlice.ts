import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  previewFiles: { file: File; base64: string }[];
  hasChanges: boolean;
}

const initialState: ImageState = {
  previewFiles: [],
  hasChanges: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (
      state,
      action: PayloadAction<{ file: File; base64: string }>
    ) => {
      state.previewFiles.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.previewFiles = state.previewFiles.filter(
        (_, index) => index !== action.payload
      );
    },
    resetImages: (state) => {
      state.previewFiles = [];
    },
    setChanges: (state, action: PayloadAction<boolean>) => {
      state.hasChanges = action.payload;
    },
  },
});

export const { addImage, removeImage, resetImages,setChanges } = imageSlice.actions;

export default imageSlice.reducer;
