// Global Jest setup. Add shared mocks here (for example MMKV or Keychain) when those libraries are added.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);