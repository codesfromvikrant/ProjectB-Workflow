import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import galleryReducer from '../features/gallerySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
});

export default rootReducer;