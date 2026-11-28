import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppIcon from '@/shared/components/AppIcon';
import { theme } from '@/theme';

type Props = {
  uri: string | null;
  width: number;
};

// Covers have a fixed 2:3 ratio. When a book has no cover, or the image fails to load,
// a placeholder with an icon is shown instead.
export default function BookCover({ uri, width }: Props) {
  const [failed, setFailed] = useState(false);
  const size = { width, height: Math.round(width * 1.5) };

  if (!uri || failed) {
    return (
      <View style={[styles.placeholder, size]}>
        <AppIcon
          name="book"
          size={Math.round(width / 3)}
          color={theme.colors.primary}
        />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[styles.image, size]}
      resizeMode="cover"
      accessibilityIgnoresInvertColors
      onError={() => setFailed(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lavender,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.lavender,
  },
});