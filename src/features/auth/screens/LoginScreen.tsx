import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch } from '@/app/hooks';
import AuthFormField from '@/features/auth/components/AuthFormField';
import AuthHeader from '@/features/auth/components/AuthHeader';
import { loginUser } from '@/features/auth/authThunks';
import { loginSchema } from '@/features/auth/schemas';
import type { LoginFormValues } from '@/features/auth/schemas';
import type { AuthStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<'Login'>) {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await dispatch(loginUser(values));
    if (loginUser.rejected.match(result)) {
      setServerError(
        result.payload ?? 'Something went wrong. Please try again.',
      );
    }
    // On success the auth state changes and the navigator shows the main tabs.
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior="padding" style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title="Welcome Back!"
            subtitle="Continue your reading journey with Readora"
          />

          <View style={styles.form}>
            <AuthFormField
              control={control}
              name="username"
              icon="user"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
              returnKeyType="next"
            />
            <AuthFormField
              control={control}
              name="password"
              icon="lock"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="done"
            />

            {serverError ? (
              <Text accessibilityRole="alert" style={styles.serverError}>
                {serverError}
              </Text>
            ) : null}

            <AppButton
              title="Log in"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Readora?</Text>
            <AppButton
              title="Create account"
              variant="outline"
              onPress={() => navigation.navigate('Register')}
            />
          </View>

          <Text style={styles.hint}>Demo account: emilys / emilyspass</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.xl,
  },
  form: {
    gap: theme.spacing.lg,
  },
  serverError: {
    ...theme.typography.caption,
    color: theme.colors.error,
    textAlign: 'center',
  },
  footer: {
    gap: theme.spacing.md,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  hint: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});