"use client";

import { CategoryTabs } from "@/components/marketplace/category-tabs";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { assetCategories } from "@/data/assets";
import { pluralizeAssets } from "@/lib/format";
import { sortOptions, type SortKey } from "@/lib/marketplace";

type MarketplaceToolbarProps = {
  category: string;
  resultCount: number;
  sort: SortKey;
  filtersOpen: boolean;
  activeFilterCount: number;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
  onToggleFilters: () => void;
};

export function MarketplaceToolbar({
  category,
  resultCount,
  sort,
  filtersOpen,
  activeFilterCount,
  onCategoryChange,
  onSortChange,
  onToggleFilters,
}: MarketplaceToolbarProps) {
  return (
    <div className="mt-6 space-y-4">
      <CategoryTabs
        categories={assetCategories}
        value={category}
        onChange={onCategoryChange}
      />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="xl:hidden"
            onClick={onToggleFilters}
          >
            {filtersOpen ? "Сховати фільтри" : "Фільтри"}
            {activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
          </Button>
          <p className="text-sm text-muted">
            Знайдено{" "}
            <span className="font-semibold text-foreground">{resultCount}</span>{" "}
            {pluralizeAssets(resultCount)}
          </p>
        </div>
        <div className="w-full sm:max-w-[240px] lg:ml-auto">
          <Select
            name="sort"
            aria-label="Сортування"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            options={sortOptions}
          />
        </div>
      </div>
    </div>
  );
}
