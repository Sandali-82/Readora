// Raw shapes of the Open Library responses. Only the fields the app uses are listed.
// Most fields are optional because Open Library data is often incomplete.

export type SearchDoc = {
  key: string;
  title?: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type SearchResponse = {
  numFound: number;
  docs: SearchDoc[];
};

export type SubjectWork = {
  key: string;
  title?: string;
  cover_id?: number | null;
  authors?: { name?: string }[];
  first_publish_year?: number;
};

export type SubjectResponse = {
  works: SubjectWork[];
};

export type WorkResponse = {
  title?: string;
  description?: string | { value?: string };
  subjects?: string[];
  covers?: number[];
  authors?: { author?: { key?: string } }[];
  first_publish_date?: string;
};

export type RatingsResponse = {
  summary?: {
    average?: number | null;
    count?: number;
  };
};