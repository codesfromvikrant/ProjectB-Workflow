import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: "",
  username: "",
  email_id: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.email_id = action.payload.email_id;
    },
    removeAuth: (state) => {
      state.uid = "";
      state.username = "";
      state.email_id = "";
    }
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;