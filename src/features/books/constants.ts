import type { IconName } from '@/shared/components/AppIcon';

// Subject used for the "Popular Books" list on the home screen.
export const POPULAR_SUBJECT = 'fiction';

export type BookCategory = {
  label: string;
  subject: string;
  icon: IconName;
};

export const BOOK_CATEGORIES: BookCategory[] = [
  { label: 'Fiction', subject: 'fiction', icon: 'book-open' },
  { label: 'Fantasy', subject: 'fantasy', icon: 'star' },
  { label: 'Mystery', subject: 'mystery', icon: 'search' },
  { label: 'Science', subject: 'science', icon: 'zap' },
  { label: 'History', subject: 'history', icon: 'clock' },
  { label: 'Romance', subject: 'romance', icon: 'heart' },
];