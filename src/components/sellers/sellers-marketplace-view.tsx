"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplacePagination } from "@/components/marketplace/marketplace-pagination";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { SellersFilters } from "@/components/sellers/sellers-filters";
import { SellersResults } from "@/components/sellers/sellers-results";
import { Container } from "@/components/ui/container";
import { pluralizeSellers } from "@/lib/format";
import {
  buildSellerMarketplaceHref,
  countActiveSellerFilters,
  defaultSellerMarketplaceFilters,
  type MarketplaceSeller,
  type SellerMarketplaceFilterState,
} from "@/lib/seller-marketplace";

type SellersMarketplaceViewProps = {
  sellers: MarketplaceSeller[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: SellerMarketplaceFilterState;
  countries: string[];
  industries: string[];
  error?: string;
};

export function SellersMarketplaceView({
  sellers,
  total,
  page,
  pageSize,
  totalPages,
  filters,
  countries,
  industries,
  error,
}: SellersMarketplaceViewProps) {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = countActiveSellerFilters(filters);

  function navigate(patch: Partial<SellerMarketplaceFilterState>) {
    const shouldResetPage = patch.page === undefined;
    const next: SellerMarketplaceFilterState = {
      ...filters,
      ...patch,
      page: shouldResetPage ? 1 : (patch.page ?? 1),
    };

    router.push(buildSellerMarketplaceHref(next));
  }

  function resetFilters() {
    navigate({
      ...defaultSellerMarketplaceFilters,
      search: filters.search,
    });
  }

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <MarketplaceHeader
          query={filters.search}
          onSearchSubmit={(search) => navigate({ search })}
          title="Продавці"
          currentLabel="Продавці"
          description="Переглядайте компанії, які продають бізнес і активи, за країною та галуззю."
          placeholder="Пошук за компанією, описом або сайтом"
          searchLabel="Пошук продавців"
        />
        <MarketplaceToolbar
          categories={["Усі"]}
          category="Усі"
          resultCount={total}
          sort="newest"
          filtersOpen={filtersOpen}
          activeFilterCount={activeFilterCount}
          onCategoryChange={() => undefined}
          onSortChange={() => undefined}
          onToggleFilters={() => setFiltersOpen((value) => !value)}
          resultLabel={pluralizeSellers}
          showCategories={false}
          showSort={false}
          filtersId="sellers-filters"
        />
        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <SellersFilters
            className={filtersOpen ? "block" : "hidden xl:block"}
            filters={filters}
            countries={countries}
            industries={industries}
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
                  Продавці недоступні
                </p>
                <p className="mt-2 text-sm text-muted">{error}</p>
              </div>
            ) : (
              <>
                <SellersResults sellers={sellers} />
                <MarketplacePagination
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  total={total}
                  getPageHref={(nextPage) =>
                    buildSellerMarketplaceHref({ ...filters, page: nextPage })
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
