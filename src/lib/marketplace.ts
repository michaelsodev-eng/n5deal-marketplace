import type { MockAsset } from "@/data/assets";

export type SortKey = "newest" | "price-desc" | "price-asc" | "revenue-desc";

export type MarketplaceFilterState = {
  query: string;
  assetType: string;
  country: string;
  industry: string;
  price: string;
  revenue: string;
  ebitda: string;
  employees: string;
  sort: SortKey;
};

export const defaultMarketplaceFilters: MarketplaceFilterState = {
  query: "",
  assetType: "all",
  country: "all",
  industry: "all",
  price: "any",
  revenue: "any",
  ebitda: "any",
  employees: "any",
  sort: "newest",
};

export const priceRangeOptions = [
  { value: "any", label: "Будь-який" },
  { value: "0-2000000", label: "До €2 млн" },
  { value: "2000000-4000000", label: "€2–4 млн" },
  { value: "4000000-6000000", label: "€4–6 млн" },
  { value: "6000000-999999999", label: "Понад €6 млн" },
];

export const revenueRangeOptions = [
  { value: "any", label: "Будь-який" },
  { value: "0-4000000", label: "До €4 млн" },
  { value: "4000000-8000000", label: "€4–8 млн" },
  { value: "8000000-999999999", label: "Понад €8 млн" },
];

export const ebitdaRangeOptions = [
  { value: "any", label: "Будь-який" },
  { value: "0-1000000", label: "До €1 млн" },
  { value: "1000000-2000000", label: "€1–2 млн" },
  { value: "2000000-999999999", label: "Понад €2 млн" },
];

export const employeeRangeOptions = [
  { value: "any", label: "Будь-яка" },
  { value: "0-25", label: "До 25" },
  { value: "26-75", label: "26–75" },
  { value: "76-150", label: "76–150" },
  { value: "151-999999", label: "Понад 150" },
];

export const sortOptions = [
  { value: "newest", label: "Спочатку новіші" },
  { value: "price-desc", label: "Ціна: від вищої" },
  { value: "price-asc", label: "Ціна: від нижчої" },
  { value: "revenue-desc", label: "Дохід: від вищого" },
];

export function matchesRange(value: number | null, range: string) {
  if (range === "any") {
    return true;
  }

  if (value == null) {
    return false;
  }

  const [min, max] = range.split("-").map(Number);
  return value >= min && value <= max;
}

export function filterMarketplaceAssets(
  assets: MockAsset[],
  filters: MarketplaceFilterState,
) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const next = assets.filter((asset) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [asset.title, asset.description, asset.industry, asset.country, asset.assetType]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesType =
      filters.assetType === "all" || asset.assetType === filters.assetType;
    const matchesCountry =
      filters.country === "all" || asset.country === filters.country;
    const matchesIndustry =
      filters.industry === "all" || asset.industry === filters.industry;

    return (
      matchesQuery &&
      matchesType &&
      matchesCountry &&
      matchesIndustry &&
      matchesRange(asset.askingPrice, filters.price) &&
      matchesRange(asset.revenue, filters.revenue) &&
      matchesRange(asset.ebitda, filters.ebitda) &&
      matchesRange(asset.employees, filters.employees)
    );
  });

  next.sort((a, b) => {
    if (filters.sort === "price-desc") {
      return b.askingPrice - a.askingPrice;
    }
    if (filters.sort === "price-asc") {
      return a.askingPrice - b.askingPrice;
    }
    if (filters.sort === "revenue-desc") {
      return (b.revenue ?? 0) - (a.revenue ?? 0);
    }
    return Date.parse(b.listedAt) - Date.parse(a.listedAt);
  });

  return next;
}

export function countActiveFilters(filters: MarketplaceFilterState) {
  return [
    filters.assetType !== "all",
    filters.country !== "all",
    filters.industry !== "all",
    filters.price !== "any",
    filters.revenue !== "any",
    filters.ebitda !== "any",
    filters.employees !== "any",
  ].filter(Boolean).length;
}
