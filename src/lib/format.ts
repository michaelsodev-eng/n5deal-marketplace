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

export function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "long",
  }).format(date);
}

export function formatNumber(value: number | null): string {
  if (value == null) {
    return "—";
  }

  return new Intl.NumberFormat("uk-UA").format(value);
}

export function formatCompactMoney(value: number | null): string {
  if (value == null) {
    return "—";
  }

  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const formatted = new Intl.NumberFormat("uk-UA", {
      minimumFractionDigits: Number.isInteger(millions) ? 0 : 1,
      maximumFractionDigits: 1,
    }).format(millions);

    return `€${formatted} млн`;
  }

  return formatMoney(value);
}

export function pluralizeAssets(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "пропозиція";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return "пропозиції";
  }

  return "пропозицій";
}

export function formatInvestmentRange(
  min: number | null,
  max: number | null,
): string {
  if (min == null && max == null) {
    return "—";
  }

  if (min != null && max != null) {
    return `${formatCompactMoney(min)} – ${formatCompactMoney(max)}`;
  }

  if (min != null) {
    return `від ${formatCompactMoney(min)}`;
  }

  return `до ${formatCompactMoney(max)}`;
}

export function pluralizeBuyers(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "покупець";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return "покупці";
  }

  return "покупців";
}

export function pluralizeSellers(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "продавець";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return "продавці";
  }

  return "продавців";
}
