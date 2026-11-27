import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/theme';

type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});