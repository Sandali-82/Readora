import { StyleSheet, Text } from 'react-native';
import type { HomeStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function HomeScreen({ navigation }: HomeStackScreenProps<'Home'>) {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Home</Text>
      <AppButton title="Search" onPress={() => navigation.navigate('Search')} />
      <AppButton
        title="Open details"
        onPress={() => navigation.navigate('Details', { workId: 'OL45883W' })}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
});