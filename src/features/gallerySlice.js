import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery: (state, action) => {
      state.images = action.payload;
    },
    addToGallery: (state, action) => {
      state.images.push(action.payload);
    }
  },
});

export const { setGallery, addToGallery } = gallerySlice.actions;

export default gallerySlice.reducer;