"use client";

import { useMemo, useState } from "react";
import { AssetCard } from "@/components/assets/asset-card";
import { CategoryTabs } from "@/components/marketplace/category-tabs";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import {
  assetCategories,
  getPublishedAssets,
  uniqueValues,
  type MockAsset,
} from "@/data/assets";

type MarketplaceViewProps = {
  initialQuery?: string;
};

type SortKey = "newest" | "price-desc" | "price-asc" | "revenue-desc";

const sortOptions = [
  { value: "newest", label: "Спочатку новіші" },
  { value: "price-desc", label: "Ціна: від вищої" },
  { value: "price-asc", label: "Ціна: від нижчої" },
  { value: "revenue-desc", label: "Дохід: від вищого" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-3.2-3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function matchesPrice(asset: MockAsset, price: string) {
  if (price === "any") {
    return true;
  }

  const [min, max] = price.split("-").map(Number);
  return asset.askingPrice >= min && asset.askingPrice <= max;
}

function sortAssets(assets: MockAsset[], sort: SortKey) {
  const next = [...assets];

  next.sort((a, b) => {
    if (sort === "price-desc") {
      return b.askingPrice - a.askingPrice;
    }
    if (sort === "price-asc") {
      return a.askingPrice - b.askingPrice;
    }
    if (sort === "revenue-desc") {
      return (b.revenue ?? 0) - (a.revenue ?? 0);
    }
    return 0;
  });

  return next;
}

const publishedAssets = getPublishedAssets();

export function MarketplaceView({ initialQuery = "" }: MarketplaceViewProps) {
  const assets = publishedAssets;
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<(typeof assetCategories)[number]>("Усі");
  const [country, setCountry] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [price, setPrice] = useState("any");
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const countries = uniqueValues(assets, "country");
  const industries = uniqueValues(assets, "industry");

  const filteredAssets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const next = assets.filter((asset) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [asset.title, asset.description, asset.industry, asset.country, asset.assetType]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory = category === "Усі" || asset.assetType === category;
      const matchesCountry = country === "all" || asset.country === country;
      const matchesIndustry = industry === "all" || asset.industry === industry;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCountry &&
        matchesIndustry &&
        matchesPrice(asset, price)
      );
    });

    return sortAssets(next, sort);
  }, [assets, category, country, industry, price, query, sort]);

  function resetFilters() {
    setCountry("all");
    setIndustry("all");
    setPrice("any");
  }

  return (
    <section className="py-10 sm:py-14">
      <Container size="wide">
        <SectionHeading
          title="Торговельний майданчик"
          description="Переглядайте доступні бізнеси та активи. Дані на цьому етапі є демонстраційними."
        />

        <form
          className="mt-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Пошук за назвою, галуззю або країною"
            aria-label="Пошук активів"
            icon={<SearchIcon />}
          />
        </form>

        <div className="mt-6">
          <CategoryTabs
            categories={assetCategories}
            value={category}
            onChange={(value) =>
              setCategory(value as (typeof assetCategories)[number])
            }
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFiltersOpen((value) => !value)}
          >
            {filtersOpen ? "Сховати фільтри" : "Показати фільтри"}
          </Button>
          <p className="text-sm text-muted">
            Знайдено {filteredAssets.length}{" "}
            {filteredAssets.length === 1 ? "актив" : "активів"}
          </p>
          <div className="w-full sm:max-w-xs">
            <Select
              name="sort"
              aria-label="Сортування"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              options={sortOptions}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <MarketplaceFilters
            className={filtersOpen ? "block" : "hidden lg:block"}
            country={country}
            industry={industry}
            price={price}
            countries={countries}
            industries={industries}
            onCountryChange={setCountry}
            onIndustryChange={setIndustry}
            onPriceChange={setPrice}
            onReset={resetFilters}
          />

          {filteredAssets.length > 0 ? (
            <div className="grid gap-5">
              {filteredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
              <p className="text-base font-medium text-foreground">
                Нічого не знайдено
              </p>
              <p className="mt-2 text-sm text-muted">
                Змініть пошуковий запит або скиньте фільтри.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
