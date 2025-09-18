export const asset = (p: string) => {
  const base =
    (import.meta as any)?.env?.BASE_URL ?? // Vite
    (process.env.PUBLIC_URL as string) ??   // CRA
    '/';
  return `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
};