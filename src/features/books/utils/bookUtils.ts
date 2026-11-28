import type {
  RatingsResponse,
  SearchDoc,
  SubjectWork,
  WorkResponse,
} from '@/features/books/api/apiTypes';
import type { Book, BookDetails, BookRating } from '@/features/books/types';
import { COVERS_BASE_URL } from '@/shared/constants/apiEndpoints';

export type CoverSize = 'S' | 'M' | 'L';

const MAX_SUBJECTS = 6;

// Open Library keys look like "/works/OL45883W". The app only uses the last part as the book id.
export function workIdFromKey(key: string): string {
  return key.split('/').filter(Boolean).pop() ?? key;
}

export function coverUrl(
  coverId: number | null | undefined,
  size: CoverSize = 'M',
): string | null {
  if (typeof coverId !== 'number' || coverId <= 0) {
    return null;
  }
  return `${COVERS_BASE_URL}/b/id/${coverId}-${size}.jpg`;
}

export function mapSearchDoc(doc: SearchDoc): Book {
  return {
    id: workIdFromKey(doc.key),
    title: doc.title ?? 'Untitled',
    authors: doc.author_name ?? [],
    coverUrl: coverUrl(doc.cover_i),
    firstPublishYear: doc.first_publish_year ?? null,
  };
}

export function mapSubjectWork(work: SubjectWork): Book {
  return {
    id: workIdFromKey(work.key),
    title: work.title ?? 'Untitled',
    authors: (work.authors ?? [])
      .map(author => author.name)
      .filter((name): name is string => Boolean(name)),
    coverUrl: coverUrl(work.cover_id),
    firstPublishYear: work.first_publish_year ?? null,
  };
}

// The description is either a plain string or an object with a "value" field, and it can end
// with an extra section after a line of dashes that we do not want to show.
export function normalizeDescription(
  description: string | { value?: string } | undefined,
): string | null {
  const text =
    typeof description === 'string' ? description : description?.value;
  const cleaned = text?.split('----------')[0].trim();
  return cleaned ? cleaned : null;
}

function extractYear(text: string | undefined): number | null {
  const match = text?.match(/\b(\d{4})\b/);
  return match ? Number(match[1]) : null;
}

function mapRating(ratings: RatingsResponse | undefined): BookRating | null {
  const average = ratings?.summary?.average;
  const count = ratings?.summary?.count ?? 0;
  if (typeof average !== 'number' || count <= 0) {
    return null;
  }
  return { average: Math.round(average * 10) / 10, count };
}

export function mapWorkDetails(
  workId: string,
  work: WorkResponse,
  authors: string[],
  ratings: RatingsResponse | undefined,
): BookDetails {
  return {
    id: workId,
    title: work.title ?? 'Untitled',
    authors,
    coverUrl: coverUrl(
      work.covers?.find(coverId => coverId > 0),
      'L',
    ),
    firstPublishYear: extractYear(work.first_publish_date),
    description: normalizeDescription(work.description),
    subjects: (work.subjects ?? []).slice(0, MAX_SUBJECTS),
    rating: mapRating(ratings),
  };
}

// Builds the search text. Characters that have a special meaning in the search syntax are removed
// so that typing "(" or a quote never breaks the request.
export function buildSearchQuery(
  text: string,
  subject?: string | null,
): string {
  const parts: string[] = [];
  const cleanedText = text
    .replace(/["\\:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanedText) {
    parts.push(cleanedText);
  }
  if (subject) {
    parts.push(`subject:"${subject}"`);
  }
  return parts.join(' ');
}