// The book types used by the screens. They do not depend on the Open Library response shape.

export type Book = {
  id: string;
  title: string;
  authors: string[];
  coverUrl: string | null;
  firstPublishYear: number | null;
};

export type BookRating = {
  average: number;
  count: number;
};

export type BookDetails = Book & {
  description: string | null;
  subjects: string[];
  rating: BookRating | null;
};

export type BooksPage = {
  books: Book[];
  total: number;
};

export type SearchBooksArgs = {
  text: string;
  subject?: string | null;
  page?: number;
};