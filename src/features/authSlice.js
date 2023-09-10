import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged_in: false,
  uid: "",
  username: "",
  email_id: "",
  show_sidebar: false,
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
    },
    showSidebar: (state) => {
      state.show_sidebar = !state.show_sidebar;
    }
  },
});

export const { setLoggedIn, setAuth, removeAuth, showSidebar } = authSlice.actions;

export default authSlice.reducer;