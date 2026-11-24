import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function FavouritesScreen() {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Favourites</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
});