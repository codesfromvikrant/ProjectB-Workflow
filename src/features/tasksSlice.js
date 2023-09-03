import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project_details: {},
  task_id: null,
  subtask_id: null,
  task_editor: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.project_details = action.payload;
    },
    setTaskID: (state, action) => {
      state.task_id = action.payload;
    },
    updateTask: (state, action) => {
      state.project_details.tasks = action.payload;
    },
    setSubTaskID: (state, action) => {
      state.subtask_id = action.payload;
    },
    setTaskEditor: (state, action) => {
      state.task_editor = action.payload;
    },
  },
});

export const { setProjectDetails, setTaskID, updateTask, setSubTaskID, setTaskEditor } =
  tasksSlice.actions;
export default tasksSlice.reducer;
