import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAuthUser } from "../../utils/localAuth";

export interface AuthUser {
  username: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: getAuthUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
