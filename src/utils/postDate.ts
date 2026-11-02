export function formatPostDate(post: { date?: string; createdAt?: string }): string {
  for (const value of [post.date, post.createdAt]) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toLocaleDateString();
  }
  return 'Date unavailable';
}
