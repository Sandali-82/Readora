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
import { registerUser } from '@/features/auth/authThunks';
import { registerSchema } from '@/features/auth/schemas';
import type { RegisterFormValues } from '@/features/auth/schemas';
import type { AuthStackScreenProps } from '@/navigation/types';
import AppButton from '@/shared/components/AppButton';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function RegisterScreen({
  navigation,
}: AuthStackScreenProps<'Register'>) {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    const result = await dispatch(registerUser(values));
    if (registerUser.rejected.match(result)) {
      setServerError(
        result.payload ?? 'Something went wrong. Please try again.',
      );
      return;
    }
    navigation.navigate('Login', { registered: true });
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior="padding" style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title="Create account"
            subtitle="Join Readora and start building your reading list"
          />

          <View style={styles.form}>
            <AuthFormField
              control={control}
              name="firstName"
              icon="user"
              placeholder="First name"
              autoCapitalize="words"
              textContentType="givenName"
            />
            <AuthFormField
              control={control}
              name="username"
              icon="at-sign"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
            />
            <AuthFormField
              control={control}
              name="email"
              icon="mail"
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />
            <AuthFormField
              control={control}
              name="password"
              icon="lock"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
            />
            <AuthFormField
              control={control}
              name="confirmPassword"
              icon="lock"
              placeholder="Confirm password"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
            />

            {serverError ? (
              <Text accessibilityRole="alert" style={styles.serverError}>
                {serverError}
              </Text>
            ) : null}

            <AppButton
              title="Create account"
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <AppButton
              title="Back to login"
              variant="outline"
              onPress={() => navigation.goBack()}
            />
          </View>
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
});