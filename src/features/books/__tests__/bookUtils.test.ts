import {
  buildSearchQuery,
  coverUrl,
  mapSearchDoc,
  mapWorkDetails,
  normalizeDescription,
  workIdFromKey,
} from '@/features/books/utils/bookUtils';

describe('workIdFromKey', () => {
  it('returns the id from a work key', () => {
    expect(workIdFromKey('/works/OL45883W')).toBe('OL45883W');
  });

  it('accepts a key that is already an id', () => {
    expect(workIdFromKey('OL27448W')).toBe('OL27448W');
  });
});

describe('coverUrl', () => {
  it('builds a cover url for the requested size', () => {
    expect(coverUrl(258027, 'L')).toBe(
      'https://covers.openlibrary.org/b/id/258027-L.jpg',
    );
  });

  it('uses the medium size by default', () => {
    expect(coverUrl(258027)).toBe(
      'https://covers.openlibrary.org/b/id/258027-M.jpg',
    );
  });

  it('returns null when the book has no cover', () => {
    expect(coverUrl(undefined)).toBeNull();
    expect(coverUrl(-1)).toBeNull();
  });
});

describe('mapSearchDoc', () => {
  it('maps a complete search result', () => {
    const book = mapSearchDoc({
      key: '/works/OL27448W',
      title: 'The Lord of the Rings',
      author_name: ['J. R. R. Tolkien'],
      cover_i: 258027,
      first_publish_year: 1954,
    });

    expect(book).toEqual({
      id: 'OL27448W',
      title: 'The Lord of the Rings',
      authors: ['J. R. R. Tolkien'],
      coverUrl: 'https://covers.openlibrary.org/b/id/258027-M.jpg',
      firstPublishYear: 1954,
    });
  });

  it('uses safe defaults when fields are missing', () => {
    const book = mapSearchDoc({ key: '/works/OL1W' });

    expect(book).toEqual({
      id: 'OL1W',
      title: 'Untitled',
      authors: [],
      coverUrl: null,
      firstPublishYear: null,
    });
  });
});

describe('normalizeDescription', () => {
  it('trims a plain string', () => {
    expect(normalizeDescription('  A story.  ')).toBe('A story.');
  });

  it('reads the value of a description object', () => {
    expect(normalizeDescription({ value: 'A story.' })).toBe('A story.');
  });

  it('returns null when there is no description', () => {
    expect(normalizeDescription(undefined)).toBeNull();
    expect(normalizeDescription('   ')).toBeNull();
  });

  it('drops the extra section after the dashes', () => {
    expect(
      normalizeDescription('A story.\r\n\r\n----------\r\nContaining: more'),
    ).toBe('A story.');
  });
});

describe('mapWorkDetails', () => {
  const work = {
    title: 'Fantastic Mr Fox',
    description: { value: 'A clever fox.' },
    subjects: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    covers: [-1, 123],
    first_publish_date: 'October 1970',
  };

  it('maps the work, authors, cover, year and rating', () => {
    const details = mapWorkDetails('OL45804W', work, ['Roald Dahl'], {
      summary: { average: 4.2345, count: 120 },
    });

    expect(details).toMatchObject({
      id: 'OL45804W',
      title: 'Fantastic Mr Fox',
      authors: ['Roald Dahl'],
      coverUrl: 'https://covers.openlibrary.org/b/id/123-L.jpg',
      firstPublishYear: 1970,
      description: 'A clever fox.',
      rating: { average: 4.2, count: 120 },
    });
  });

  it('keeps only the first six subjects', () => {
    const details = mapWorkDetails('OL45804W', work, [], undefined);

    expect(details.subjects).toHaveLength(6);
  });

  it('hides the rating when nobody rated the book', () => {
    const noRatings = mapWorkDetails('OL1W', work, [], {
      summary: { average: null, count: 0 },
    });
    const missingRatings = mapWorkDetails('OL1W', work, [], undefined);

    expect(noRatings.rating).toBeNull();
    expect(missingRatings.rating).toBeNull();
  });
});

describe('buildSearchQuery', () => {
  it('uses only the text when there is no subject', () => {
    expect(buildSearchQuery('harry potter')).toBe('harry potter');
  });

  it('uses only the subject when the text is empty', () => {
    expect(buildSearchQuery('', 'fantasy')).toBe('subject:"fantasy"');
  });

  it('combines the text and the subject', () => {
    expect(buildSearchQuery('dragon', 'fantasy')).toBe(
      'dragon subject:"fantasy"',
    );
  });

  it('removes characters that break the search syntax', () => {
    expect(buildSearchQuery('a "b" (c): d')).toBe('a b c d');
  });

  it('returns an empty string for blank input', () => {
    expect(buildSearchQuery('   ', null)).toBe('');
  });
});