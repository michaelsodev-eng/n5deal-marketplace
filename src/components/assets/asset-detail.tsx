import { CountryMark } from "@/components/assets/country-mark";
import { MarketInsights } from "@/components/marketplace/market-insights";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { MarketplaceAsset } from "@/lib/marketplace";
import { formatDate, formatMoney, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

const statusLabels: Record<MarketplaceAsset["status"], string> = {
  PUBLISHED: "У продажу",
  DRAFT: "Чернетка",
  SUSPENDED: "Призупинено",
};

const statusVariants: Record<
  MarketplaceAsset["status"],
  "success" | "neutral" | "warning"
> = {
  PUBLISHED: "success",
  DRAFT: "neutral",
  SUSPENDED: "warning",
};

type AssetDetailProps = {
  asset: MarketplaceAsset;
};

export function AssetDetail({ asset }: AssetDetailProps) {
  const metrics = [
    { label: "Ціна пропозиції", value: formatMoney(asset.askingPrice) },
    { label: "Дохід", value: formatMoney(asset.revenue) },
    { label: "EBITDA", value: formatMoney(asset.ebitda) },
    { label: "Співробітники", value: formatNumber(asset.employees) },
  ];

  const facts = [
    { label: "Країна", value: asset.country },
    { label: "Тип активу", value: asset.assetType },
    { label: "Галузь", value: asset.industry },
    { label: "Статус", value: statusLabels[asset.status] },
    { label: "Опубліковано", value: formatDate(asset.listedAt) },
    ...(asset.foundedYear
      ? [{ label: "Рік заснування", value: String(asset.foundedYear) }]
      : []),
  ];

  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <Breadcrumbs
          items={[
            { href: "/", label: "Головна" },
            { href: "/assets", label: "Торговельний майданчик" },
            { label: asset.title },
          ]}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-4">
            <Card className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <CountryMark country={asset.country} />
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">{asset.assetType}</Badge>
                  <Badge variant="default">{asset.industry}</Badge>
                  <Badge variant={statusVariants[asset.status]}>
                    {statusLabels[asset.status]}
                  </Badge>
                </div>
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {asset.title}
              </h1>

              <dl className="mt-6 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-slate-50/80 sm:grid-cols-4">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "px-3 py-3",
                      index % 2 === 1 && "border-l border-border",
                      index >= 2 && "border-t border-border",
                      index > 0 && "sm:border-l",
                      "sm:border-t-0",
                    )}
                  >
                    <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {asset.foundedYear ? (
                <p className="mt-4 text-sm text-muted">
                  Засновано {asset.foundedYear}
                </p>
              ) : null}

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">Опис</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {asset.description}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold text-foreground">
                  Ключова інформація про бізнес
                </h2>
                <dl className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-start justify-between gap-4 px-4 py-3"
                    >
                      <dt className="text-sm text-muted">{fact.label}</dt>
                      <dd className="text-sm font-medium text-foreground">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button className="sm:flex-1">Зв’язатися з продавцем</Button>
                <Button href="/assets" variant="outline" className="sm:flex-1">
                  Назад на торговельний майданчик
                </Button>
              </div>
            </Card>
          </div>

          <div className="xl:block">
            <MarketInsights />
          </div>
        </div>
      </Container>
    </section>
  );
}
