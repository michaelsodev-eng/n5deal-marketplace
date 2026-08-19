import {
  MARKETPLACE_PAGE_SIZE,
  type SearchParamsInput,
} from "@/lib/marketplace";

export type MarketplaceSeller = {
  id: string;
  companyName: string;
  description: string | null;
  country: string | null;
  website: string | null;
  publishedCount: number;
  industries: string[];
};

export type SellerMarketplaceFilterState = {
  search: string;
  country: string;
  industry: string;
  page: number;
};

export const SELLER_MARKETPLACE_PAGE_SIZE = MARKETPLACE_PAGE_SIZE;

export const defaultSellerMarketplaceFilters: SellerMarketplaceFilterState = {
  search: "",
  country: "all",
  industry: "all",
  page: 1,
};

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

export function parseSellerMarketplaceSearchParams(
  params: SearchParamsInput,
): SellerMarketplaceFilterState {
  const search = (readParam(params, "search") || readParam(params, "q")).slice(
    0,
    120,
  );
  const pageRaw = Number.parseInt(readParam(params, "page"), 10);
  const page = Number.isInteger(pageRaw) && pageRaw > 0 ? pageRaw : 1;

  return {
    search,
    country: normalizeFilterValue(readParam(params, "country")),
    industry: normalizeFilterValue(readParam(params, "industry")),
    page,
  };
}

export function buildSellerMarketplaceHref(
  filters: SellerMarketplaceFilterState,
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

  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  const query = params.toString();
  return query ? `/sellers?${query}` : "/sellers";
}

export function countActiveSellerFilters(filters: SellerMarketplaceFilterState) {
  return [
    filters.country !== "all",
    filters.industry !== "all",
  ].filter(Boolean).length;
}

export function sellerWebsiteHref(value: string | null): string | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
