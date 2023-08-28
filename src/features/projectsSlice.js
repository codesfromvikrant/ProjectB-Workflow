import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ongoing: [],
  completed: [],
  trash: [],
  archived: [],
  editproject_id: null,
  project_editor: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setOngoing: (state, action) => {
      state.ongoing = action.payload;
    },
    addInOngoing: (state, action) => {
      state.ongoing.push(action.payload);
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    addInCompleted: (state, action) => {
      state.completed.push(action.payload);
    },
    setTrash: (state, action) => {
      state.trash = action.payload;
    },
    addInTrash: (state, action) => {
      state.trash.push(action.payload);
    },
    setArchived: (state, action) => {
      state.archived = action.payload;
    },
    addInArchived: (state, action) => {
      state.archived.push(action.payload);
    },
    editProjectId: (state, action) => {
      state.editproject_id = action.payload;
    },
    projectEditor: (state, action) => {
      state.project_editor = action.payload;
    },
  },
});

export const {
  setOngoing,
  addInOngoing,
  editProjectId,
  projectEditor,
  setCompleted,
  addInCompleted,
  setTrash,
  addInTrash,
  setArchived,
  addInArchived,
} = projectsSlice.actions;
export default projectsSlice.reducer;