import reducer, { signedIn, signedOut } from '@/features/auth/authSlice';
import type { AuthState } from '@/features/auth/authSlice';

const signedOutState: AuthState = { isAuthenticated: false, userName: null };

describe('authSlice', () => {
  it('starts signed out', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(signedOutState);
  });

  it('stores the user name when signing in', () => {
    const state = reducer(signedOutState, signedIn({ userName: 'Emily' }));

    expect(state).toEqual({ isAuthenticated: true, userName: 'Emily' });
  });

  it('clears the session when signing out', () => {
    const signedInState: AuthState = {
      isAuthenticated: true,
      userName: 'Emily',
    };

    expect(reducer(signedInState, signedOut())).toEqual(signedOutState);
  });

  it('never keeps a token in the Redux state', () => {
    const state = reducer(undefined, signedIn({ userName: 'Emily' }));

    expect(Object.keys(state).sort()).toEqual(['isAuthenticated', 'userName']);
  });
});