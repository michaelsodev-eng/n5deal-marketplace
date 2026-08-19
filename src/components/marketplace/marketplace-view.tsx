"use client";

import { useMemo, useState } from "react";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplaceResults } from "@/components/marketplace/marketplace-results";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { Container } from "@/components/ui/container";
import { getPublishedAssets, uniqueValues } from "@/data/assets";
import {
  countActiveFilters,
  defaultMarketplaceFilters,
  filterMarketplaceAssets,
  type MarketplaceFilterState,
} from "@/lib/marketplace";

type MarketplaceViewProps = {
  initialQuery?: string;
};

const publishedAssets = getPublishedAssets();

export function MarketplaceView({ initialQuery = "" }: MarketplaceViewProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<MarketplaceFilterState>({
    ...defaultMarketplaceFilters,
    query: initialQuery,
  });

  const countries = uniqueValues(publishedAssets, "country");
  const industries = uniqueValues(publishedAssets, "industry");
  const assetTypes = uniqueValues(publishedAssets, "assetType");

  const filteredAssets = useMemo(
    () => filterMarketplaceAssets(publishedAssets, filters),
    [filters],
  );

  const activeFilterCount = countActiveFilters(filters);
  const category =
    filters.assetType === "all" ? "Усі" : filters.assetType;

  function patchFilters(patch: Partial<MarketplaceFilterState>) {
    setFilters((current) => ({ ...current, ...patch }));
  }

  function resetFilters() {
    setFilters((current) => ({
      ...defaultMarketplaceFilters,
      query: current.query,
      sort: current.sort,
    }));
  }

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <MarketplaceHeader
          query={filters.query}
          onQueryChange={(query) => patchFilters({ query })}
        />
        <MarketplaceToolbar
          category={category}
          resultCount={filteredAssets.length}
          sort={filters.sort}
          filtersOpen={filtersOpen}
          activeFilterCount={activeFilterCount}
          onCategoryChange={(value) =>
            patchFilters({ assetType: value === "Усі" ? "all" : value })
          }
          onSortChange={(sort) => patchFilters({ sort })}
          onToggleFilters={() => setFiltersOpen((value) => !value)}
        />
        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <MarketplaceFilters
            className={filtersOpen ? "block" : "hidden xl:block"}
            filters={filters}
            countries={countries}
            industries={industries}
            assetTypes={assetTypes}
            onChange={patchFilters}
            onReset={resetFilters}
          />
          <MarketplaceResults assets={filteredAssets} />
          <div className="xl:block">
            <MarketInsights />
          </div>
        </div>
      </Container>
    </section>
  );
}
