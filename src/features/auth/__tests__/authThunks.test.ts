import { configureStore } from '@reduxjs/toolkit';
import * as authService from '@/features/auth/authService';
import authReducer, { signedIn } from '@/features/auth/authSlice';
import {
  loginUser,
  logoutUser,
  restoreSession,
} from '@/features/auth/authThunks';
import * as tokenStorage from '@/features/auth/tokenStorage';

jest.mock('@/features/auth/authService');
jest.mock('@/features/auth/tokenStorage');

const mockedService = jest.mocked(authService);
const mockedStorage = jest.mocked(tokenStorage);

function createTestStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

beforeEach(() => {
  jest.resetAllMocks();
  mockedStorage.saveToken.mockResolvedValue(undefined);
  mockedStorage.clearToken.mockResolvedValue(undefined);
});

describe('loginUser', () => {
  it('saves the token and signs the user in', async () => {
    mockedService.login.mockResolvedValue({
      accessToken: 'token-1',
      firstName: 'Emily',
    } as authService.LoginResponse);
    const store = createTestStore();

    await store.dispatch(
      loginUser({ username: 'emilys', password: 'emilyspass' }),
    );

    expect(mockedStorage.saveToken).toHaveBeenCalledWith('token-1');
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: true,
      userName: 'Emily',
    });
  });

  it('rejects with the server message and stores nothing when login fails', async () => {
    mockedService.login.mockRejectedValue(new Error('Invalid credentials'));
    const store = createTestStore();

    const result = await store.dispatch(
      loginUser({ username: 'emilys', password: 'wrong' }),
    );

    expect(loginUser.rejected.match(result)).toBe(true);
    expect(result.payload).toBe('Invalid credentials');
    expect(mockedStorage.saveToken).not.toHaveBeenCalled();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});

describe('logoutUser', () => {
  it('clears the token and signs the user out', async () => {
    const store = createTestStore();
    store.dispatch(signedIn({ userName: 'Emily' }));

    await store.dispatch(logoutUser());

    expect(mockedStorage.clearToken).toHaveBeenCalled();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});

describe('restoreSession', () => {
  it('finishes restoring as signed out when there is no stored token', async () => {
    mockedStorage.getToken.mockResolvedValue(null);
    const store = createTestStore();

    await store.dispatch(restoreSession());

    expect(mockedService.getCurrentUser).not.toHaveBeenCalled();
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: false,
      isRestoring: false,
    });
  });

  it('signs the user in again when the stored token is valid', async () => {
    mockedStorage.getToken.mockResolvedValue('token-1');
    mockedService.getCurrentUser.mockResolvedValue({
      firstName: 'Emily',
    } as authService.CurrentUser);
    const store = createTestStore();

    await store.dispatch(restoreSession());

    expect(store.getState().auth).toMatchObject({
      isAuthenticated: true,
      isRestoring: false,
      userName: 'Emily',
    });
  });

  it('clears the token and signs out when the stored token is rejected', async () => {
    mockedStorage.getToken.mockResolvedValue('expired-token');
    mockedService.getCurrentUser.mockRejectedValue(new Error('Token expired'));
    const store = createTestStore();

    await store.dispatch(restoreSession());

    expect(mockedStorage.clearToken).toHaveBeenCalled();
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: false,
      isRestoring: false,
    });
  });
});