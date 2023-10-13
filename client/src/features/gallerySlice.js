import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  imageURL: '',
  viewImage: false
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
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    setViewImage: (state, action) => {
      state.viewImage = action.payload;
    },
  },
});

export const { setGallery, addToGallery, setImageURL, setViewImage } = gallerySlice.actions;

export default gallerySlice.reducer;