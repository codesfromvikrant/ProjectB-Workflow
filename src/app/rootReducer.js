import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import galleryReducer from '../features/gallerySlice';
import notesReducer from '../features/notesSlice';
import projectsReducer from '../features/projectsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
  notes: notesReducer,
  projects: projectsReducer,
});

export default rootReducer;