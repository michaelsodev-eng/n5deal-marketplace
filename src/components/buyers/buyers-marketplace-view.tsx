"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BuyersFilters } from "@/components/buyers/buyers-filters";
import { BuyersResults } from "@/components/buyers/buyers-results";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplacePagination } from "@/components/marketplace/marketplace-pagination";
import { MarketplaceToolbar } from "@/components/marketplace/marketplace-toolbar";
import { Container } from "@/components/ui/container";
import {
  buildBuyerMarketplaceHref,
  countActiveBuyerFilters,
  defaultBuyerMarketplaceFilters,
  type BuyerMarketplaceFilterState,
  type MarketplaceBuyer,
} from "@/lib/buyer-marketplace";
import { pluralizeBuyers } from "@/lib/format";

type BuyersMarketplaceViewProps = {
  buyers: MarketplaceBuyer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: BuyerMarketplaceFilterState;
  countries: string[];
  industries: string[];
  error?: string;
};

export function BuyersMarketplaceView({
  buyers,
  total,
  page,
  pageSize,
  totalPages,
  filters,
  countries,
  industries,
  error,
}: BuyersMarketplaceViewProps) {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = countActiveBuyerFilters(filters);

  function navigate(patch: Partial<BuyerMarketplaceFilterState>) {
    const shouldResetPage = patch.page === undefined;
    const next: BuyerMarketplaceFilterState = {
      ...filters,
      ...patch,
      page: shouldResetPage ? 1 : (patch.page ?? 1),
    };

    router.push(buildBuyerMarketplaceHref(next));
  }

  function resetFilters() {
    navigate({
      ...defaultBuyerMarketplaceFilters,
      search: filters.search,
    });
  }

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <MarketplaceHeader
          query={filters.search}
          onSearchSubmit={(search) => navigate({ search })}
          title="Покупці"
          currentLabel="Покупці"
          description="Переглядайте інвестиційні профілі покупців за країною, галуззю та діапазоном інвестицій."
          placeholder="Пошук за компанією, описом або інтересами щодо угод"
          searchLabel="Пошук покупців"
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
          resultLabel={pluralizeBuyers}
          showCategories={false}
          showSort={false}
          filtersId="buyers-filters"
        />
        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <BuyersFilters
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
                  Покупці недоступні
                </p>
                <p className="mt-2 text-sm text-muted">{error}</p>
              </div>
            ) : (
              <>
                <BuyersResults buyers={buyers} />
                <MarketplacePagination
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  total={total}
                  getPageHref={(nextPage) =>
                    buildBuyerMarketplaceHref({ ...filters, page: nextPage })
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
