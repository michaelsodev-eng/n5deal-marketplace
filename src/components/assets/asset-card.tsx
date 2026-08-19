import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MockAsset } from "@/data/assets";
import { formatMoney, formatNumber } from "@/lib/format";

const statusLabels: Record<MockAsset["status"], string> = {
  PUBLISHED: "У продажу",
  DRAFT: "Чернетка",
  SUSPENDED: "Призупинено",
};

const statusVariants: Record<
  MockAsset["status"],
  "success" | "neutral" | "warning"
> = {
  PUBLISHED: "success",
  DRAFT: "neutral",
  SUSPENDED: "warning",
};

type AssetCardProps = {
  asset: MockAsset;
};

export function AssetCard({ asset }: AssetCardProps) {
  const metrics = [
    { label: "Ціна пропозиції", value: formatMoney(asset.askingPrice) },
    { label: "Дохід", value: formatMoney(asset.revenue) },
    { label: "EBITDA", value: formatMoney(asset.ebitda) },
    { label: "Співробітники", value: formatNumber(asset.employees) },
  ];

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={statusVariants[asset.status]}>
          {statusLabels[asset.status]}
        </Badge>
        <Badge variant="neutral">{asset.assetType}</Badge>
        <span className="ml-auto text-sm text-muted">{asset.country}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {asset.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{asset.industry}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
        {asset.description}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-xs text-muted">{metric.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-col gap-2 sm:mt-auto sm:flex-row">
        <Button variant="primary" className="sm:flex-1">
          Переглянути деталі
        </Button>
        <Button variant="outline" className="sm:flex-1">
          Контакти
        </Button>
      </div>
    </Card>
  );
}
