import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
