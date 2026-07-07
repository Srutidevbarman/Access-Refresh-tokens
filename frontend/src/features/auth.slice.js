import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    isLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { addUser, isLoading, removeUser } = authSlice.actions;
export default authSlice.reducer;
