import {
  MARKETPLACE_PAGE_SIZE,
  type SearchParamsInput,
} from "@/lib/marketplace";

export type MarketplaceBuyer = {
  id: string;
  companyName: string;
  description: string | null;
  investmentTypes: string[];
  industries: string[];
  countries: string[];
  minInvestment: number | null;
  maxInvestment: number | null;
  acquisitionInterests: string | null;
};

export type BuyerMarketplaceFilterState = {
  search: string;
  country: string;
  industry: string;
  investment: string;
  page: number;
};

export const BUYER_MARKETPLACE_PAGE_SIZE = MARKETPLACE_PAGE_SIZE;

export const defaultBuyerMarketplaceFilters: BuyerMarketplaceFilterState = {
  search: "",
  country: "all",
  industry: "all",
  investment: "any",
  page: 1,
};

export const investmentRangeOptions = [
  { value: "any", label: "Будь-який" },
  { value: "0-2000000", label: "До €2 млн" },
  { value: "2000000-5000000", label: "€2–5 млн" },
  { value: "5000000-10000000", label: "€5–10 млн" },
  { value: "10000000-999999999", label: "Понад €10 млн" },
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

export function parseBuyerMarketplaceSearchParams(
  params: SearchParamsInput,
): BuyerMarketplaceFilterState {
  const search = (readParam(params, "search") || readParam(params, "q")).slice(
    0,
    120,
  );
  const investmentRaw = readParam(params, "investment");
  const investment = investmentRangeOptions.some(
    (option) => option.value === investmentRaw,
  )
    ? investmentRaw
    : "any";
  const pageRaw = Number.parseInt(readParam(params, "page"), 10);
  const page = Number.isInteger(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  return {
    search,
    country: normalizeFilterValue(readParam(params, "country")),
    industry: normalizeFilterValue(readParam(params, "industry")),
    investment,
    page,
  };
}

export function buildBuyerMarketplaceHref(
  filters: BuyerMarketplaceFilterState,
): string {
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

  if (filters.investment !== "any") {
    params.set("investment", filters.investment);
  }

  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  const query = params.toString();
  return query ? `/buyers?${query}` : "/buyers";
}

export function countActiveBuyerFilters(filters: BuyerMarketplaceFilterState) {
  return [
    filters.country !== "all",
    filters.industry !== "all",
    filters.investment !== "any",
  ].filter(Boolean).length;
}
