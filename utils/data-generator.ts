export function uniqueEmail(prefix: string): string {
  const timestamp = Date.now();
  return `${prefix}.${timestamp}@example.test`;
}
