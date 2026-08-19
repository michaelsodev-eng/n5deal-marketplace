"use client";

import { CategoryTabs } from "@/components/marketplace/category-tabs";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { pluralizeAssets } from "@/lib/format";
import { sortOptions, type SortKey } from "@/lib/marketplace";

type MarketplaceToolbarProps = {
  categories: readonly string[];
  category: string;
  resultCount: number;
  sort: SortKey;
  filtersOpen: boolean;
  activeFilterCount: number;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
  onToggleFilters: () => void;
  resultLabel?: (count: number) => string;
  showCategories?: boolean;
  showSort?: boolean;
  filtersId?: string;
};

export function MarketplaceToolbar({
  categories,
  category,
  resultCount,
  sort,
  filtersOpen,
  activeFilterCount,
  onCategoryChange,
  onSortChange,
  onToggleFilters,
  resultLabel = pluralizeAssets,
  showCategories = true,
  showSort = true,
  filtersId = "marketplace-filters",
}: MarketplaceToolbarProps) {
  return (
    <div className="mt-6 space-y-4">
      {showCategories ? (
        <CategoryTabs
          categories={categories}
          value={category}
          onChange={onCategoryChange}
        />
      ) : null}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="xl:hidden"
            aria-expanded={filtersOpen}
            aria-controls={filtersId}
            onClick={onToggleFilters}
          >
            {filtersOpen ? "Сховати фільтри" : "Фільтри"}
            {activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
          </Button>
          <p className="text-sm text-muted">
            Знайдено{" "}
            <span className="font-semibold text-foreground">{resultCount}</span>{" "}
            {resultLabel(resultCount)}
          </p>
        </div>
        {showSort ? (
          <div className="w-full sm:max-w-[240px] lg:ml-auto">
            <Select
              name="sort"
              aria-label="Сортування"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortKey)}
              options={sortOptions}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
