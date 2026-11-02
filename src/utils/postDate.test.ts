import { formatPostDate } from './postDate';
test('falls back to creation date when publication date is invalid or missing', () => {
 const createdAt = '2026-11-02T10:00:00Z';
 expect(formatPostDate({createdAt})).toBe(new Date(createdAt).toLocaleDateString());
 expect(formatPostDate({date:'bad',createdAt})).toBe(new Date(createdAt).toLocaleDateString());
 expect(formatPostDate({})).toBe('Date unavailable');
});
