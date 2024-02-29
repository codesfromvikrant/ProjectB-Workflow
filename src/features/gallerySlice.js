import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
  totalImages: 0,
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
    setTotalImages: (state, action) => {
      state.totalImages = action.payload;
    },
  },
});

export const { setGallery, addToGallery, setImageURL, setViewImage, setTotalImages } = gallerySlice.actions;

export default gallerySlice.reducer;