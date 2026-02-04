import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showLogin: boolean;
}

const initialState: UIState = {
  showLogin: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLogin(state) {
      state.showLogin = true;
    },
    closeLogin(state) {
      state.showLogin = false;
    },
  },
});

export const { openLogin, closeLogin } = uiSlice.actions;
export default uiSlice.reducer;
