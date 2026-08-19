import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

export function HomeHero() {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,#eef3fb_0%,#f6f8fb_100%)]">
      <Container size="wide" className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            N5Deal Marketplace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Пошук бізнес- та інвестиційних можливостей
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Переглядайте перевірені компанії, активи та угоди в одному
            професійному просторі для покупців і продавців.
          </p>
        </div>

        <form
          action="/assets"
          method="get"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-card sm:flex-row sm:items-center sm:p-2"
        >
          <div className="flex-1">
            <Input
              name="search"
              type="search"
              placeholder="Пошук за галуззю, країною або типом активу"
              aria-label="Пошук можливостей"
              icon={<SearchIcon />}
              variant="plain"
              className="h-12"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Знайти
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/assets" size="lg">
            Дослідити торговельний майданчик
          </Button>
          <Button href="/register" variant="outline" size="lg">
            Продати свій бізнес
          </Button>
        </div>
      </Container>
    </section>
  );
}
