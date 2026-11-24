import { StyleSheet, Text } from 'react-native';
import type { HomeStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function DetailsScreen({ navigation, route }: HomeStackScreenProps<'Details'>) {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.body}>Work ID: {route.params.workId}</Text>
      <AppButton title="Back" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});