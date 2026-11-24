import { StyleSheet, Text } from 'react-native';
import type { AuthStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function RegisterScreen({ navigation }: AuthStackScreenProps<'Register'>) {
  return (
    <ScreenContainer centered>
      <Text style={styles.title}>Register</Text>
      <AppButton title="Back to login" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
});