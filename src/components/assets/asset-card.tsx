import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountryMark } from "@/components/assets/country-mark";
import type { MarketplaceAsset } from "@/lib/marketplace";
import { formatCompactMoney, formatNumber } from "@/lib/format";
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

type AssetCardProps = {
  asset: MarketplaceAsset;
};

export function AssetCard({ asset }: AssetCardProps) {
  const metrics = [
    { label: "Ціна пропозиції", value: formatCompactMoney(asset.askingPrice) },
    { label: "Дохід", value: formatCompactMoney(asset.revenue) },
    { label: "EBITDA", value: formatCompactMoney(asset.ebitda) },
    { label: "Співробітники", value: formatNumber(asset.employees) },
  ];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_28px_rgba(15,34,64,0.08)]">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
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

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {asset.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {asset.description}
        </p>

        <dl className="mt-5 mb-5 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-slate-50/80 sm:grid-cols-4">
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
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 3v4M16 3v4M4 10h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Засновано {asset.foundedYear}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:mt-auto sm:flex-row">
          <Button href={`/assets/${asset.id}`} variant="primary" className="sm:flex-1">
            Переглянути деталі
          </Button>
          <Button variant="outline" className="sm:flex-1">
            Зв’язатися з продавцем
          </Button>
        </div>
      </div>
    </Card>
  );
}
