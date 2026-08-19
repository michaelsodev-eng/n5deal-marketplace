export type MarketplaceAssetStatus = "DRAFT" | "PUBLISHED" | "SUSPENDED";

export type MarketplaceAsset = {
  id: string;
  title: string;
  description: string;
  assetType: string;
  industry: string;
  country: string;
  askingPrice: number;
  revenue: number | null;
  ebitda: number | null;
  employees: number | null;
  foundedYear: number | null;
  listedAt: string;
  status: MarketplaceAssetStatus;
};

export type SortKey = "newest" | "price-asc" | "price-desc" | "ebitda-desc";

export type MarketplaceFilterState = {
  search: string;
  assetType: string;
  country: string;
  industry: string;
  price: string;
  revenue: string;
  ebitda: string;
  employees: string;
  sort: SortKey;
  page: number;
};

export type SearchParamsInput = {
  [key: string]: string | string[] | undefined;
};

export const MARKETPLACE_PAGE_SIZE = 10;

export const defaultMarketplaceFilters: MarketplaceFilterState = {
  search: "",
  assetType: "all",
  country: "all",
  industry: "all",
  price: "any",
  revenue: "any",
  ebitda: "any",
  employees: "any",
  sort: "newest",
  page: 1,
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
  { value: "price-asc", label: "Ціна: від нижчої" },
  { value: "price-desc", label: "Ціна: від вищої" },
  { value: "ebitda-desc", label: "EBITDA: від вищої" },
];

const SORT_VALUES: SortKey[] = [
  "newest",
  "price-asc",
  "price-desc",
  "ebitda-desc",
];

function readParam(params: SearchParamsInput, key: string): string {
  const value = params[key];

  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function normalizeFilterValue(value: string): string {
  if (!value || value === "all") {
    return "all";
  }

  return value.slice(0, 80);
}

function normalizeRange(
  value: string,
  options: Array<{ value: string }>,
): string {
  return options.some((option) => option.value === value) ? value : "any";
}

export function parseNumericRange(
  value: string,
): { gte: number; lte: number } | undefined {
  if (value === "any") {
    return undefined;
  }

  const [minRaw, maxRaw] = value.split("-");
  const gte = Number(minRaw);
  const lte = Number(maxRaw);

  if (!Number.isFinite(gte) || !Number.isFinite(lte) || gte > lte) {
    return undefined;
  }

  return { gte, lte };
}

export function parseMarketplaceSearchParams(
  params: SearchParamsInput,
): MarketplaceFilterState {
  const search = (readParam(params, "search") || readParam(params, "q")).slice(
    0,
    120,
  );
  const sortRaw = readParam(params, "sort");
  const sort = SORT_VALUES.includes(sortRaw as SortKey)
    ? (sortRaw as SortKey)
    : "newest";
  const pageRaw = Number.parseInt(readParam(params, "page"), 10);
  const page = Number.isInteger(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  return {
    search,
    assetType: normalizeFilterValue(readParam(params, "assetType")),
    country: normalizeFilterValue(readParam(params, "country")),
    industry: normalizeFilterValue(readParam(params, "industry")),
    price: normalizeRange(readParam(params, "price"), priceRangeOptions),
    revenue: normalizeRange(readParam(params, "revenue"), revenueRangeOptions),
    ebitda: normalizeRange(readParam(params, "ebitda"), ebitdaRangeOptions),
    employees: normalizeRange(
      readParam(params, "employees"),
      employeeRangeOptions,
    ),
    sort,
    page,
  };
}

export function buildMarketplaceHref(filters: MarketplaceFilterState): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.country !== "all") {
    params.set("country", filters.country);
  }

  if (filters.industry !== "all") {
    params.set("industry", filters.industry);
  }

  if (filters.assetType !== "all") {
    params.set("assetType", filters.assetType);
  }

  if (filters.price !== "any") {
    params.set("price", filters.price);
  }

  if (filters.revenue !== "any") {
    params.set("revenue", filters.revenue);
  }

  if (filters.ebitda !== "any") {
    params.set("ebitda", filters.ebitda);
  }

  if (filters.employees !== "any") {
    params.set("employees", filters.employees);
  }

  if (filters.sort !== "newest") {
    params.set("sort", filters.sort);
  }

  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  const query = params.toString();
  return query ? `/assets?${query}` : "/assets";
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
