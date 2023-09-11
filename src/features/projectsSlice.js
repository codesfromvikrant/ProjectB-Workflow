import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ongoing: [],
  filter_ongoing: [],
  completed: [],
  filter_completed: [],
  archived: [],
  filter_archived: [],
  editproject_id: null,
  project_editor: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setOngoing: (state, action) => {
      state.ongoing = action.payload;
      state.filter_ongoing = action.payload;
    },
    addInOngoing: (state, action) => {
      state.ongoing.push(action.payload);
      state.filter_ongoing.push(action.payload);
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
      state.filter_completed = action.payload;
    },
    addInCompleted: (state, action) => {
      state.completed.push(action.payload);
      state.filter_completed.push(action.payload);
    },
    setArchived: (state, action) => {
      state.archived = action.payload;
      state.filter_archived = action.payload;
    },
    addInArchived: (state, action) => {
      state.archived.push(action.payload);
      state.filter_archived.push(action.payload);
    },
    editProjectId: (state, action) => {
      state.editproject_id = action.payload;
    },
    projectEditor: (state, action) => {
      state.project_editor = action.payload;
    },

    filterOngoing: (state, action) => {
      state.filter_ongoing = action.payload;
    },
    filterCompleted: (state, action) => {
      state.filter_completed = action.payload;
    },
    filterArchived: (state, action) => {
      state.filter_archived = action.payload;
    },

  },
});

export const {
  setOngoing,
  addInOngoing,
  setCompleted,
  addInCompleted,
  setArchived,
  addInArchived,
  editProjectId,
  projectEditor,

  filterOngoing,
  filterCompleted,
  filterArchived,
} = projectsSlice.actions;
export default projectsSlice.reducer;