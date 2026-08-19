"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplacePagination } from "@/components/marketplace/marketplace-pagination";
import { MarketplaceResults } from "@/components/marketplace/marketplace-results";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { Container } from "@/components/ui/container";
import {
  buildMarketplaceHref,
  countActiveFilters,
  defaultMarketplaceFilters,
  type MarketplaceAsset,
  type MarketplaceFilterState,
} from "@/lib/marketplace";

type MarketplaceViewProps = {
  assets: MarketplaceAsset[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: MarketplaceFilterState;
  countries: string[];
  industries: string[];
  assetTypes: string[];
  error?: string;
};

export function MarketplaceView({
  assets,
  total,
  page,
  pageSize,
  totalPages,
  filters,
  countries,
  industries,
  assetTypes,
  error,
}: MarketplaceViewProps) {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ["Усі", ...assetTypes];
  const category = filters.assetType === "all" ? "Усі" : filters.assetType;
  const activeFilterCount = countActiveFilters(filters);

  function navigate(patch: Partial<MarketplaceFilterState>) {
    const shouldResetPage = patch.page === undefined;
    const next: MarketplaceFilterState = {
      ...filters,
      ...patch,
      page: shouldResetPage ? 1 : (patch.page ?? 1),
    };

    router.push(buildMarketplaceHref(next));
  }

  function resetFilters() {
    navigate({
      ...defaultMarketplaceFilters,
      search: filters.search,
      sort: filters.sort,
    });
  }

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <MarketplaceHeader
          query={filters.search}
          onSearchSubmit={(search) => navigate({ search })}
        />
        <MarketplaceToolbar
          categories={categories}
          category={category}
          resultCount={total}
          sort={filters.sort}
          filtersOpen={filtersOpen}
          activeFilterCount={activeFilterCount}
          onCategoryChange={(value) =>
            navigate({ assetType: value === "Усі" ? "all" : value })
          }
          onSortChange={(sort) => navigate({ sort })}
          onToggleFilters={() => setFiltersOpen((value) => !value)}
        />
        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <MarketplaceFilters
            className={filtersOpen ? "block" : "hidden xl:block"}
            filters={filters}
            countries={countries}
            industries={industries}
            assetTypes={assetTypes}
            onChange={navigate}
            onReset={resetFilters}
          />
          <div className="min-w-0 space-y-4">
            {error ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center"
              >
                <p className="text-base font-medium text-foreground">
                  Пропозиції недоступні
                </p>
                <p className="mt-2 text-sm text-muted">{error}</p>
              </div>
            ) : (
              <>
                <MarketplaceResults assets={assets} />
                <MarketplacePagination
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  total={total}
                  getPageHref={(nextPage) =>
                    buildMarketplaceHref({ ...filters, page: nextPage })
                  }
                />
              </>
            )}
          </div>
          <div className="hidden xl:block">
            <MarketInsights />
          </div>
        </div>
      </Container>
    </section>
  );
}
