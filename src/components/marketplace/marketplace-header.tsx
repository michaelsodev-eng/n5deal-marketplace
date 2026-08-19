"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

type MarketplaceHeaderProps = {
  query: string;
  onSearchSubmit: (value: string) => void;
  title?: string;
  description?: string;
  currentLabel?: string;
  placeholder?: string;
  searchLabel?: string;
};

export function MarketplaceHeader({
  query,
  onSearchSubmit,
  title = "Торговельний майданчик",
  description = "Відібрані бізнеси, компанії та інвестиційні активи для покупців, які оцінюють угоди за фінансовими показниками, галуззю та географією.",
  currentLabel = "Торговельний майданчик",
  placeholder = "Пошук за назвою, країною, галуззю або типом активу",
  searchLabel = "Пошук активів",
}: MarketplaceHeaderProps) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { href: "/", label: "Головна" },
          { label: currentLabel },
        ]}
      />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight break-words text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {description}
      </p>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSearchSubmit(String(formData.get("search") ?? "").trim());
        }}
      >
        <div className="min-w-0 flex-1">
          <Input
            key={query}
            name="search"
            type="search"
            defaultValue={query}
            placeholder={placeholder}
            aria-label={searchLabel}
            icon={<SearchIcon />}
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Шукати
        </Button>
      </form>
    </div>
  );
}
