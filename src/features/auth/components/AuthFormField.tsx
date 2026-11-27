import type { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import TextField from '@/shared/components/TextField';

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof TextField>,
  'value' | 'onChangeText' | 'onBlur' | 'error'
> & {
  control: Control<T>;
  name: Path<T>;
};

// Connects the shared TextField to react-hook-form and shows the validation message under it.
export default function AuthFormField<T extends FieldValues>({
  control,
  name,
  ...fieldProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...fieldProps}
          value={field.value as string}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}