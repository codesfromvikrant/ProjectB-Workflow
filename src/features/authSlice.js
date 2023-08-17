import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged_in: false,
  uid: "",
  username: "",
  email_id: "",
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.logged_in = action.payload;
    },
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

export const { setLoggedIn, setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;