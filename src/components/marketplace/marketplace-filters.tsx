"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";

type MarketplaceFiltersProps = {
  country: string;
  industry: string;
  price: string;
  countries: string[];
  industries: string[];
  onCountryChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onReset: () => void;
  className?: string;
};

const priceOptions = [
  { value: "any", label: "Будь-яка ціна" },
  { value: "0-2000000", label: "До €2 млн" },
  { value: "2000000-4000000", label: "€2–4 млн" },
  { value: "4000000-999999999", label: "Понад €4 млн" },
];

export function MarketplaceFilters({
  country,
  industry,
  price,
  countries,
  industries,
  onCountryChange,
  onIndustryChange,
  onPriceChange,
  onReset,
  className,
}: MarketplaceFiltersProps) {
  return (
    <aside
      className={cn(
        "rounded-xl border border-border bg-surface p-4 shadow-card",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Фільтри</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Скинути
        </Button>
      </div>
      <div className="space-y-4">
        <Select
          label="Країна"
          name="country"
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
          options={[
            { value: "all", label: "Усі країни" },
            ...countries.map((item) => ({ value: item, label: item })),
          ]}
        />
        <Select
          label="Галузь"
          name="industry"
          value={industry}
          onChange={(event) => onIndustryChange(event.target.value)}
          options={[
            { value: "all", label: "Усі галузі" },
            ...industries.map((item) => ({ value: item, label: item })),
          ]}
        />
        <Select
          label="Ціна пропозиції"
          name="price"
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
          options={priceOptions}
        />
      </div>
    </aside>
  );
}
