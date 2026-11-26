import reducer, { signedIn, signedOut } from '@/features/auth/authSlice';
import type { AuthState } from '@/features/auth/authSlice';

const startState: AuthState = {
  isAuthenticated: false,
  isRestoring: true,
  userName: null,
};

describe('authSlice', () => {
  it('starts signed out while the stored session is being checked', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(startState);
  });

  it('stores the user name and stops restoring when signing in', () => {
    const state = reducer(startState, signedIn({ userName: 'Emily' }));

    expect(state).toEqual({
      isAuthenticated: true,
      isRestoring: false,
      userName: 'Emily',
    });
  });

  it('clears the session and stops restoring when signing out', () => {
    const signedInState: AuthState = {
      isAuthenticated: true,
      isRestoring: false,
      userName: 'Emily',
    };

    expect(reducer(signedInState, signedOut())).toEqual({
      isAuthenticated: false,
      isRestoring: false,
      userName: null,
    });
  });

  it('never keeps a token in the Redux state', () => {
    const state = reducer(undefined, signedIn({ userName: 'Emily' }));

    expect(Object.keys(state).sort()).toEqual([
      'isAuthenticated',
      'isRestoring',
      'userName',
    ]);
  });
});