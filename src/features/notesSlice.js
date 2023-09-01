import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_notes: [],
  trash: [],
  filtered_notes: [],
  filtered_tags: [],
  tags_selected: [],
  filter_dialog: false,
  addtag_dialog: false,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setAllNotes: (state, action) => {
      state.all_notes = action.payload;
    },
    setFilteredNotes: (state, action) => {
      state.filtered_notes = action.payload;
    },
    setFilteredTags: (state, action) => {
      state.filtered_tags = action.payload;
    },
    addInTagsAvailable: (state, action) => {
      state.filtered_tags.push(action.payload);
    },
    openFilterDialog: (state) => {
      state.filter_dialog = !state.filter_dialog;
    },
    openAddTagDialog: (state) => {
      state.addtag_dialog = !state.addtag_dialog;
    },
    setTagsSelected: (state, action) => {
      state.tags_selected = action.payload;
    },
    addInTagsSelected: (state, action) => {
      state.tags_selected.push(action.payload);
    },
  },
});

export const {
  setAllNotes,
  setFilteredNotes,
  setFilteredTags,
  openFilterDialog,
  openAddTagDialog,
  addInTagsAvailable,
  setTagsSelected,
  addInTagsSelected,
} = notesSlice.actions;

export default notesSlice.reducer;
