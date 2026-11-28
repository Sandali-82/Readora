import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  RatingsResponse,
  SearchResponse,
  SubjectResponse,
  WorkResponse,
} from '@/features/books/api/apiTypes';
import type {
  Book,
  BookDetails,
  BooksPage,
  SearchBooksArgs,
} from '@/features/books/types';
import {
  buildSearchQuery,
  mapSearchDoc,
  mapSubjectWork,
  mapWorkDetails,
} from '@/features/books/utils/bookUtils';
import { OPEN_LIBRARY_BASE_URL } from '@/shared/constants/apiEndpoints';

export const SEARCH_PAGE_SIZE = 20;
const SEARCH_FIELDS = 'key,title,author_name,cover_i,first_publish_year';
const SUBJECT_LIST_SIZE = 12;

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: OPEN_LIBRARY_BASE_URL }),
  endpoints: builder => ({
    // Smart search: free text plus an optional subject chip.
    searchBooks: builder.query<BooksPage, SearchBooksArgs>({
      query: ({ text, subject, page = 1 }) => ({
        url: '/search.json',
        params: {
          q: buildSearchQuery(text, subject),
          fields: SEARCH_FIELDS,
          limit: SEARCH_PAGE_SIZE,
          page,
        },
      }),
      transformResponse: (response: SearchResponse): BooksPage => ({
        books: response.docs.map(mapSearchDoc),
        total: response.numFound,
      }),
    }),

    // Books for the Home lists (for example "Popular Books"), by subject slug such as "fantasy".
    getBooksBySubject: builder.query<Book[], string>({
      query: subject => ({
        url: `/subjects/${subject}.json`,
        params: { limit: SUBJECT_LIST_SIZE },
      }),
      transformResponse: (response: SubjectResponse): Book[] =>
        response.works.map(mapSubjectWork),
    }),

    // Details for one work. The work itself is required; author names and ratings are optional.
    getBookDetails: builder.query<BookDetails, string>({
      async queryFn(workId, _api, _extraOptions, baseQuery) {
        const workResult = await baseQuery(`/works/${workId}.json`);
        if (workResult.error) {
          return { error: workResult.error };
        }
        const work = workResult.data as WorkResponse;

        const authorKeys = (work.authors ?? [])
          .map(entry => entry.author?.key)
          .filter((key): key is string => Boolean(key))
          .slice(0, 2);

        // If the ratings or an author request fails, the details still load without them.
        const [ratingsResult, ...authorResults] = await Promise.all([
          baseQuery(`/works/${workId}/ratings.json`),
          ...authorKeys.map(key => baseQuery(`${key}.json`)),
        ]);

        const authors = authorResults
          .map(result => (result.data as { name?: string } | undefined)?.name)
          .filter((name): name is string => Boolean(name));
        const ratings = ratingsResult.data as RatingsResponse | undefined;

        return { data: mapWorkDetails(workId, work, authors, ratings) };
      },
    }),
  }),
});

export const {
  useSearchBooksQuery,
  useGetBooksBySubjectQuery,
  useGetBookDetailsQuery,
} = booksApi;