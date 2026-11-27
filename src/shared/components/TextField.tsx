import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import AppIcon from '@/shared/components/AppIcon';
import { theme } from '@/theme';

type IconName = ComponentProps<typeof AppIcon>['name'];

type Props = Omit<TextInputProps, 'style'> & {
  icon: IconName;
  error?: string;
};

export default function TextField({
  icon,
  error,
  secureTextEntry,
  ...inputProps
}: Props) {
  const [isHidden, setIsHidden] = useState(true);
  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.field, error ? styles.fieldWithError : null]}>
        <AppIcon name={icon} size={20} color={theme.colors.textSecondary} />
        <TextInput
          {...inputProps}
          secureTextEntry={isPassword && isHidden}
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />
        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isHidden ? 'Show password' : 'Hide password'}
            onPress={() => setIsHidden(current => !current)}
            style={styles.toggle}
          >
            <AppIcon
              name={isHidden ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text accessibilityRole="alert" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.xs,
  },
  field: {
    minHeight: theme.touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  fieldWithError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  toggle: {
    width: theme.touchTarget,
    height: theme.touchTarget,
    marginRight: -theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    paddingHorizontal: theme.spacing.xs,
  },
});