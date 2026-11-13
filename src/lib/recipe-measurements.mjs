// The ingredient converter accepts decimal, fractional and mixed-number amounts.
export function parseFraction(input) {
  const normalized = input.trim();
  const fractionMap = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 };
  if (fractionMap[normalized] != null) return fractionMap[normalized];

  const parts = normalized.split(/\s+/);
  if (parts.length === 2) return Number(parts[0]) + parseFraction(parts[1]);
  if (normalized.includes('/')) {
    const [numerator, denominator] = normalized.split('/').map(Number);
    return numerator / denominator;
  }
  return Number(normalized);
}
