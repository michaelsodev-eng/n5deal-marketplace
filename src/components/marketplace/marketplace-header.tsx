"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
};

export function MarketplaceHeader({
  query,
  onSearchSubmit,
}: MarketplaceHeaderProps) {
  return (
    <div>
      <Breadcrumbs
        items={[
          { href: "/", label: "Головна" },
          { label: "Торговельний майданчик" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Торговельний майданчик
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        Відібрані бізнеси, компанії та інвестиційні активи для покупців, які
        оцінюють угоди за фінансовими показниками, галуззю та географією.
      </p>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          onSearchSubmit(String(formData.get("search") ?? "").trim());
        }}
      >
        <Input
          key={query}
          name="search"
          type="search"
          defaultValue={query}
          placeholder="Пошук за назвою, країною, галуззю або типом активу"
          aria-label="Пошук активів"
          icon={<SearchIcon />}
        />
      </form>
    </div>
  );
}
