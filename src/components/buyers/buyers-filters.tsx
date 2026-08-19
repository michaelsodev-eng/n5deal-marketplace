"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import {
  investmentRangeOptions,
  type BuyerMarketplaceFilterState,
} from "@/lib/buyer-marketplace";

type BuyersFiltersProps = {
  filters: BuyerMarketplaceFilterState;
  countries: string[];
  industries: string[];
  onChange: (patch: Partial<BuyerMarketplaceFilterState>) => void;
  onReset: () => void;
  className?: string;
};

export function BuyersFilters({
  filters,
  countries,
  industries,
  onChange,
  onReset,
  className,
}: BuyersFiltersProps) {
  return (
    <aside
      id="buyers-filters"
      className={cn(
        "rounded-xl border border-border bg-surface p-4 shadow-card xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Фільтри</h2>
          <p className="mt-0.5 text-xs text-muted">Уточніть вибірку покупців</p>
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
          label="Діапазон інвестицій"
          name="investment"
          value={filters.investment}
          onChange={(event) => onChange({ investment: event.target.value })}
          options={investmentRangeOptions}
          className="h-10"
        />
      </div>
    </aside>
  );
}
