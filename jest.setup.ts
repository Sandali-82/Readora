// Global Jest setup. Add shared mocks here (for example MMKV or Keychain) when those libraries are added.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue(false),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
}));

// The Feather package loads a font file that Jest cannot parse, so icons are replaced with a plain Text component.
jest.mock('@react-native-vector-icons/feather', () => {
  const { Text } = require('react-native');
  return { __esModule: true, default: Text };
});