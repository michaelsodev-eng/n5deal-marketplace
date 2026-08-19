"use client";

import { useMemo, useState } from "react";
import { CategoryTabs } from "@/components/marketplace/category-tabs";
import { ResourceCard } from "@/components/resources/resource-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import {
  filterMarketplaceResources,
  marketplaceResources,
  resourceCategoryOptions,
} from "@/lib/resources";

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

export function ResourcesView() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState<(typeof resourceCategoryOptions)[number]>(
    "Усі",
  );

  const resources = useMemo(
    () =>
      filterMarketplaceResources(
        marketplaceResources,
        submittedQuery,
        category,
      ),
    [submittedQuery, category],
  );

  return (
    <section className="py-8 sm:py-12">
      <Container size="wide">
        <Breadcrumbs
          items={[
            { href: "/", label: "Головна" },
            { label: "Ресурси" },
          ]}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,#eef3fb_0%,#ffffff_100%)] p-5 sm:p-8">
          <p className="text-sm font-medium tracking-wide text-primary">
            Ресурси
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Матеріали про M&A, придбання та інвестиції
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Короткі гіди, аналітика ринку та глосарій для покупців і продавців:
            як оцінювати бізнес, готувати due diligence, читати EBITDA і
            виходити на угоду підготовленими.
          </p>
          <form
            className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmittedQuery(query.trim());
            }}
          >
            <div className="min-w-0 flex-1">
              <Input
                name="search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Пошук за темою, тегом або категорією"
                aria-label="Пошук ресурсів"
                icon={<SearchIcon />}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Шукати
            </Button>
          </form>
        </div>

        <div className="mt-8">
          <CategoryTabs
            categories={resourceCategoryOptions}
            value={category}
            onChange={(value) =>
              setCategory(value as (typeof resourceCategoryOptions)[number])
            }
          />
        </div>

        <p className="mt-5 text-sm text-muted">
          Знайдено{" "}
          <span className="font-semibold text-foreground">{resources.length}</span>{" "}
          {resources.length === 1 ? "матеріал" : "матеріалів"}
        </p>

        {resources.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="text-base font-medium text-foreground">
              Нічого не знайдено
            </p>
            <p className="mt-2 text-sm text-muted">
              Змініть пошуковий запит або оберіть іншу категорію, щоб побачити
              доступні матеріали.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setSubmittedQuery("");
                setCategory("Усі");
              }}
            >
              Скинути фільтри
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
