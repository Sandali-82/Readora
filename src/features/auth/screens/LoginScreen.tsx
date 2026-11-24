import { StyleSheet, Text } from 'react-native';
import type { AuthStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Login</Text>
      <AppButton title="Create account" onPress={() => navigation.navigate('Register')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
});