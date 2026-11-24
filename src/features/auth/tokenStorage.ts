import * as Keychain from 'react-native-keychain';

// The token is kept in the Android Keystore / iOS Keychain, never in AsyncStorage or MMKV.
const SERVICE = 'com.readora.auth';
const ACCOUNT = 'session';

export async function saveToken(token: string): Promise<void> {
  await Keychain.setGenericPassword(ACCOUNT, token, { service: SERVICE });
}

export async function getToken(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({ service: SERVICE });
  return credentials ? credentials.password : null;
}

export async function clearToken(): Promise<void> {
  await Keychain.resetGenericPassword({ service: SERVICE });
}