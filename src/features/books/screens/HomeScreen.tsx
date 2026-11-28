import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUserName } from '@/features/auth/authSlice';
import { logoutUser } from '@/features/auth/authThunks';
import { useGetBooksBySubjectQuery } from '@/features/books/api/booksApi';
import BookCard from '@/features/books/components/BookCard';
import {
  BOOK_CATEGORIES,
  POPULAR_SUBJECT,
} from '@/features/books/constants';
import type { HomeStackScreenProps } from '@/navigation/types';
import AppIcon from '@/shared/components/AppIcon';
import EmptyView from '@/shared/components/EmptyView';
import ErrorView from '@/shared/components/ErrorView';
import ScreenContainer from '@/shared/components/ScreenContainer';
import { theme } from '@/theme';

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'Home'>) {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const {
    data: books,
    isLoading,
    isError,
    refetch,
  } = useGetBooksBySubjectQuery(POPULAR_SUBJECT);

  const openDetails = (workId: string) =>
    navigation.navigate('Details', { workId });

  const renderPopularBooks = () => {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }
    if (isError) {
      return <ErrorView onRetry={refetch} />;
    }
    if (!books || books.length === 0) {
      return (
        <EmptyView
          icon="book"
          title="No books to show yet"
          message="Try searching for a title or an author."
        />
      );
    }
    return (
      <FlatList
        horizontal
        data={books}
        keyExtractor={book => book.id}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => openDetails(item.id)} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.popularList}
      />
    );
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text accessibilityRole="header" style={styles.greeting}>
              Hello, {userName}!
            </Text>
            <Text style={styles.subtitle}>
              Let's find your next favourite book
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log out"
            onPress={() => dispatch(logoutUser())}
            style={styles.iconButton}
          >
            <AppIcon name="log-out" size={22} color={theme.colors.primary} />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="search"
          accessibilityLabel="Search books"
          onPress={() => navigation.navigate('Search')}
          style={styles.searchEntry}
        >
          <AppIcon
            name="search"
            size={20}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.searchPlaceholder}>Search books, authors...</Text>
        </Pressable>

        <View style={styles.section}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Popular Books
          </Text>
          {renderPopularBooks()}
        </View>

        <View style={styles.section}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Browse by Category
          </Text>
          <View style={styles.categories}>
            {BOOK_CATEGORIES.map(category => (
              <Pressable
                key={category.subject}
                accessibilityRole="button"
                accessibilityLabel={`Browse ${category.label} books`}
                onPress={() =>
                  navigation.navigate('Search', { subject: category.subject })
                }
                style={styles.categoryCard}
              >
                <AppIcon
                  name={category.icon}
                  size={22}
                  color={theme.colors.primary}
                />
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerText: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  greeting: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  iconButton: {
    width: theme.touchTarget,
    height: theme.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.lavender,
  },
  searchEntry: {
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
  searchPlaceholder: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.subheading,
    color: theme.colors.text,
  },
  loading: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularList: {
    gap: theme.spacing.lg,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  categoryCard: {
    flexGrow: 1,
    flexBasis: '30%',
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.lavender,
  },
  categoryLabel: {
    ...theme.typography.caption,
    fontWeight: theme.typography.subheading.fontWeight,
    color: theme.colors.text,
  },
});