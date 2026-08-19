import { CountryMark } from "@/components/assets/country-mark";
import { ContactBuyerForm } from "@/components/buyers/contact-buyer-form";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { MarketplaceBuyer } from "@/lib/buyer-marketplace";
import type { BuyerContactContext } from "@/lib/contact-requests";
import { formatInvestmentRange, formatMoney } from "@/lib/format";

type BuyerDetailProps = {
  buyer: MarketplaceBuyer;
  contact: BuyerContactContext;
};

export function BuyerDetail({ buyer, contact }: BuyerDetailProps) {
  const facts = [
    {
      label: "Діапазон інвестицій",
      value: formatInvestmentRange(buyer.minInvestment, buyer.maxInvestment),
    },
    {
      label: "Мінімальна інвестиція",
      value: formatMoney(buyer.minInvestment),
    },
    {
      label: "Максимальна інвестиція",
      value: formatMoney(buyer.maxInvestment),
    },
    {
      label: "Типи інвестицій",
      value:
        buyer.investmentTypes.length > 0
          ? buyer.investmentTypes.join(", ")
          : "—",
    },
    {
      label: "Галузі",
      value: buyer.industries.length > 0 ? buyer.industries.join(", ") : "—",
    },
    {
      label: "Країни",
      value: buyer.countries.length > 0 ? buyer.countries.join(", ") : "—",
    },
  ];

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <Breadcrumbs
          items={[
            { href: "/", label: "Головна" },
            { href: "/buyers", label: "Покупці" },
            { label: buyer.companyName },
          ]}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-4">
            <Card className="p-5 sm:p-6">
              {buyer.countries.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {buyer.countries.map((country) => (
                    <CountryMark key={country} country={country} />
                  ))}
                </div>
              ) : null}

              <h1 className="mt-4 text-2xl font-semibold tracking-tight break-words text-foreground sm:text-3xl">
                {buyer.companyName}
              </h1>

              {buyer.investmentTypes.length > 0 || buyer.industries.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {buyer.investmentTypes.map((item) => (
                    <Badge key={item} variant="neutral">
                      {item}
                    </Badge>
                  ))}
                  {buyer.industries.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              ) : null}

              <dl className="mt-6 overflow-hidden rounded-lg border border-border bg-slate-50/80">
                <div className="px-3 py-3">
                  <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                    Діапазон інвестицій
                  </dt>
                  <dd className="mt-1 text-sm font-semibold break-words text-foreground">
                    {formatInvestmentRange(
                      buyer.minInvestment,
                      buyer.maxInvestment,
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">Опис</h2>
                <p className="mt-2 text-sm leading-7 break-words text-muted">
                  {buyer.description || "Опис не вказано."}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">
                  Інтереси щодо угод
                </h2>
                <p className="mt-2 text-sm leading-7 break-words text-muted">
                  {buyer.acquisitionInterests || "Не вказано."}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">
                  Профіль покупця
                </h2>
                <dl className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-4 px-4 py-3"
                    >
                      <dt className="shrink-0 text-sm text-muted">{fact.label}</dt>
                      <dd className="min-w-0 text-right text-sm font-medium break-words text-foreground">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 space-y-3">
                {contact.mode === "guest" ? (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button href="/login" className="sm:flex-1">
                      Зв’язатися з покупцем
                    </Button>
                    <Button href="/buyers" variant="outline" className="sm:flex-1">
                      Назад до списку покупців
                    </Button>
                  </div>
                ) : null}

                {contact.mode === "seller" && contact.hasPending ? (
                  <div
                    role="status"
                    className="rounded-lg border border-success/20 bg-success-soft px-3 py-2.5 text-sm text-success"
                  >
                    Запит надіслано покупцю.
                  </div>
                ) : null}

                {contact.mode === "seller" && !contact.hasPending ? (
                  <ContactBuyerForm buyerProfileId={buyer.id} />
                ) : null}

                {contact.mode !== "guest" ? (
                  <Button href="/buyers" variant="outline" className="w-full sm:w-auto">
                    Назад до списку покупців
                  </Button>
                ) : null}
              </div>
            </Card>
          </div>

          <div className="hidden xl:block">
            <MarketInsights />
          </div>
        </div>
      </Container>
    </section>
  );
}
