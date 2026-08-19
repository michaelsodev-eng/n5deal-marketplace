import { AssetCard } from "@/components/assets/asset-card";
import { CountryMark } from "@/components/assets/country-mark";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { formatNumber } from "@/lib/format";
import { sellerWebsiteHref } from "@/lib/seller-marketplace";
import type { MarketplaceSellerDetail } from "@/lib/sellers";

type SellerDetailProps = {
  seller: MarketplaceSellerDetail;
};

export function SellerDetail({ seller }: SellerDetailProps) {
  const website = sellerWebsiteHref(seller.website);
  const facts = [
    {
      label: "Країна",
      value: seller.country ?? "—",
    },
    {
      label: "Опубліковані активи",
      value: formatNumber(seller.publishedCount),
    },
    {
      label: "Галузі",
      value: seller.industries.length > 0 ? seller.industries.join(", ") : "—",
    },
    {
      label: "Сайт",
      value: website ?? "—",
    },
  ];

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <Breadcrumbs
          items={[
            { href: "/", label: "Головна" },
            { href: "/sellers", label: "Продавці" },
            { label: seller.companyName },
          ]}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-4">
            <Card className="p-5 sm:p-6">
              {seller.country ? <CountryMark country={seller.country} /> : null}

              <h1 className="mt-4 text-2xl font-semibold tracking-tight break-words text-foreground sm:text-3xl">
                {seller.companyName}
              </h1>

              {seller.industries.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {seller.industries.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              ) : null}

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">Опис</h2>
                <p className="mt-2 text-sm leading-7 break-words text-muted">
                  {seller.description || "Опис не вказано."}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">
                  Профіль продавця
                </h2>
                <dl className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-4 px-4 py-3"
                    >
                      <dt className="shrink-0 text-sm text-muted">{fact.label}</dt>
                      <dd className="min-w-0 text-right text-sm font-medium break-words text-foreground">
                        {fact.label === "Сайт" && website ? (
                          <a
                            href={website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:text-primary-hover"
                          >
                            {website}
                          </a>
                        ) : (
                          fact.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button href="/sellers" variant="outline" className="sm:flex-1">
                  Назад до списку продавців
                </Button>
              </div>
            </Card>

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Активи продавця
              </h2>
              {seller.assets.length > 0 ? (
                <div className="mt-4 grid gap-4">
                  {seller.assets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
                  <p className="text-base font-medium text-foreground">
                    Опублікованих активів ще немає
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Коли продавець опублікує пропозицію, вона з’явиться тут.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="hidden xl:block">
            <MarketInsights />
          </div>
        </div>
      </Container>
    </section>
  );
}
