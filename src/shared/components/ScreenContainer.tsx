import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';

type Props = PropsWithChildren<{ centered?: boolean }>;

export default function ScreenContainer({ children, centered = false }: Props) {
  return (
    <SafeAreaView
      style={[styles.container, centered && styles.centered]}
      edges={['top', 'left', 'right']}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
});