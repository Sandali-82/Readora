import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  login,
  registerUser as registerRequest,
} from '@/features/auth/authService';
import { signedIn, signedOut } from '@/features/auth/authSlice';
import type {
  LoginFormValues,
  RegisterFormValues,
} from '@/features/auth/schemas';
import {
  clearToken,
  getToken,
  saveToken,
} from '@/features/auth/tokenStorage';

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Something went wrong. Please try again.';
}

// Login has several steps, so it is a thunk: call the API, save the token in the keychain, then update Redux.
export const loginUser = createAsyncThunk<
  void,
  LoginFormValues,
  { rejectValue: string }
>('auth/loginUser', async (values, { dispatch, rejectWithValue }) => {
  try {
    const response = await login(values.username, values.password);
    await saveToken(response.accessToken);
    dispatch(signedIn({ userName: response.firstName }));
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Registration is simulated by DummyJSON. The user is sent to the login screen afterwards, not signed in.
export const registerUser = createAsyncThunk<
  void,
  RegisterFormValues,
  { rejectValue: string }
>('auth/registerUser', async (values, { rejectWithValue }) => {
  try {
    await registerRequest(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await clearToken();
    } finally {
      dispatch(signedOut());
    }
  },
);

// Runs once when the app starts: if a valid token is in the keychain, sign the user in again.
export const restoreSession = createAsyncThunk<void, void>(
  'auth/restoreSession',
  async (_, { dispatch }) => {
    try {
      const token = await getToken();
      if (!token) {
        dispatch(signedOut());
        return;
      }
      const user = await getCurrentUser(token);
      dispatch(signedIn({ userName: user.firstName }));
    } catch {
      await clearToken().catch(() => undefined);
      dispatch(signedOut());
    }
  },
);