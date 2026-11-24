import * as Keychain from 'react-native-keychain';
import {
  clearToken,
  getToken,
  saveToken,
} from '@/features/auth/tokenStorage';

describe('tokenStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves the token in the keychain under the app service', async () => {
    await saveToken('abc123');

    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'session',
      'abc123',
      { service: 'com.readora.auth' },
    );
  });

  it('returns the stored token', async () => {
    jest
      .mocked(Keychain.getGenericPassword)
      .mockResolvedValueOnce({
        username: 'session',
        password: 'abc123',
      } as Keychain.UserCredentials);

    await expect(getToken()).resolves.toBe('abc123');
  });

  it('returns null when no token is stored', async () => {
    jest.mocked(Keychain.getGenericPassword).mockResolvedValueOnce(false);

    await expect(getToken()).resolves.toBeNull();
  });

  it('clears the token from the keychain on logout', async () => {
    await clearToken();

    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
      service: 'com.readora.auth',
    });
  });
});