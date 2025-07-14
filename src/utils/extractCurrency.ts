export const extractCurrency = (value: string) => {
  if (!value) return null;
  const currencyMatch = value.match(/\d+(?:,\d{3})*(?:\.\d{2})?\s*(.+)$/);
  return currencyMatch ? currencyMatch[1] : null;
};
