import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import galleryReducer from '../features/gallerySlice';
import notesReducer from '../features/notesSlice';
import projectsReducer from '../features/projectsSlice';
import tasksReducer from '../features/tasksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryReducer,
  notes: notesReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

export default rootReducer;