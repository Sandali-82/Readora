import { StyleSheet, Text } from 'react-native';
import type { HomeStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function SearchScreen({ navigation }: HomeStackScreenProps<'Search'>) {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Search</Text>
      <AppButton title="Back" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
});