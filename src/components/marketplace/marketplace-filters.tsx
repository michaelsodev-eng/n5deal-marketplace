"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import {
  ebitdaRangeOptions,
  employeeRangeOptions,
  priceRangeOptions,
  revenueRangeOptions,
  type MarketplaceFilterState,
} from "@/lib/marketplace";

type MarketplaceFiltersProps = {
  filters: MarketplaceFilterState;
  countries: string[];
  industries: string[];
  assetTypes: string[];
  onChange: (patch: Partial<MarketplaceFilterState>) => void;
  onReset: () => void;
  className?: string;
};

export function MarketplaceFilters({
  filters,
  countries,
  industries,
  assetTypes,
  onChange,
  onReset,
  className,
}: MarketplaceFiltersProps) {
  return (
    <aside
      id="marketplace-filters"
      className={cn(
        "rounded-xl border border-border bg-surface p-4 shadow-card xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Фільтри</h2>
          <p className="mt-0.5 text-xs text-muted">Уточніть вибірку угод</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Очистити
        </Button>
      </div>
      <div className="space-y-3.5">
        <Select
          label="Країна"
          name="country"
          value={filters.country}
          onChange={(event) => onChange({ country: event.target.value })}
          options={[
            { value: "all", label: "Усі країни" },
            ...countries.map((item) => ({ value: item, label: item })),
          ]}
          className="h-10"
        />
        <Select
          label="Галузь"
          name="industry"
          value={filters.industry}
          onChange={(event) => onChange({ industry: event.target.value })}
          options={[
            { value: "all", label: "Усі галузі" },
            ...industries.map((item) => ({ value: item, label: item })),
          ]}
          className="h-10"
        />
        <Select
          label="Тип активу"
          name="assetType"
          value={filters.assetType}
          onChange={(event) => onChange({ assetType: event.target.value })}
          options={[
            { value: "all", label: "Усі типи" },
            ...assetTypes.map((item) => ({ value: item, label: item })),
          ]}
          className="h-10"
        />
        <Select
          label="Діапазон цін запиту"
          name="price"
          value={filters.price}
          onChange={(event) => onChange({ price: event.target.value })}
          options={priceRangeOptions}
          className="h-10"
        />
        <Select
          label="Діапазон доходу"
          name="revenue"
          value={filters.revenue}
          onChange={(event) => onChange({ revenue: event.target.value })}
          options={revenueRangeOptions}
          className="h-10"
        />
        <Select
          label="Діапазон EBITDA"
          name="ebitda"
          value={filters.ebitda}
          onChange={(event) => onChange({ ebitda: event.target.value })}
          options={ebitdaRangeOptions}
          className="h-10"
        />
        <Select
          label="Співробітники"
          name="employees"
          value={filters.employees}
          onChange={(event) => onChange({ employees: event.target.value })}
          options={employeeRangeOptions}
          className="h-10"
        />
      </div>
    </aside>
  );
}
