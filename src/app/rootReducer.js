import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import galleryReducer from '../features/gallerySlice';
import notesReducer from '../features/notesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
  notes: notesReducer,
});

export default rootReducer;