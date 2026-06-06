export function nowIso(): string {
  return new Date().toISOString();
}

export function msAgo(isoString: string): number {
  return Date.now() - new Date(isoString).getTime();
}

export function daysAgo(isoString: string): number {
  return Math.floor(msAgo(isoString) / (1000 * 60 * 60 * 24));
}

export function isValidIso(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const d = new Date(value);
  return !isNaN(d.getTime());
}
