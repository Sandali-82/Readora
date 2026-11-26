import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

// The token is NOT kept here. It lives in the keychain (see tokenStorage.ts).
export type AuthState = {
  isAuthenticated: boolean;
  // True until the stored session has been checked when the app starts.
  isRestoring: boolean;
  userName: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isRestoring: true,
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<{ userName: string }>) {
      state.isAuthenticated = true;
      state.isRestoring = false;
      state.userName = action.payload.userName;
    },
    signedOut(state) {
      state.isAuthenticated = false;
      state.isRestoring = false;
      state.userName = null;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsRestoring = (state: RootState) => state.auth.isRestoring;
export const selectUserName = (state: RootState) => state.auth.userName;