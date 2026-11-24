import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/theme';

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: theme.touchTarget,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.onPrimary,
  },
});