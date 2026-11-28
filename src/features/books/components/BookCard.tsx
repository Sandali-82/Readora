import { Pressable, StyleSheet, Text } from 'react-native';
import BookCover from '@/features/books/components/BookCover';
import type { Book } from '@/features/books/types';
import { theme } from '@/theme';

const CARD_WIDTH = 120;

type Props = {
  book: Book;
  onPress: () => void;
};

export default function BookCard({ book, onPress }: Props) {
  const author = book.authors[0] ?? 'Unknown author';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${book.title} by ${author}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <BookCover uri={book.coverUrl} width={CARD_WIDTH} />
      <Text numberOfLines={2} style={styles.title}>
        {book.title}
      </Text>
      <Text numberOfLines={1} style={styles.author}>
        {author}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    gap: theme.spacing.xs,
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    ...theme.typography.caption,
    fontWeight: theme.typography.subheading.fontWeight,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
  author: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
});