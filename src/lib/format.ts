export function formatMoney(value: number | null): string {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number | null): string {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("uk-UA").format(value);
}
