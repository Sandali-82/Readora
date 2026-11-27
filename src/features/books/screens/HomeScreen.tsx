import { StyleSheet, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUserName } from '@/features/auth/authSlice';
import { logoutUser } from '@/features/auth/authThunks';
import type { HomeStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'Home'>) {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);

  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Hello, {userName}!</Text>
      <AppButton title="Search" onPress={() => navigation.navigate('Search')} />
      <AppButton
        title="Open details"
        onPress={() => navigation.navigate('Details', { workId: 'OL45883W' })}
      />
      <AppButton
        title="Log out"
        variant="outline"
        onPress={() => dispatch(logoutUser())}
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