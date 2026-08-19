import Link from "next/link";
import { ManagerAssetActions } from "@/components/dashboard/manager-asset-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ManagerAssetItem } from "@/lib/dashboard";
import { formatMoney } from "@/lib/format";

const statusLabels = {
  PUBLISHED: "Опубліковано",
  DRAFT: "Чернетка",
  SUSPENDED: "Призупинено",
} as const;

const statusVariants = {
  PUBLISHED: "success",
  DRAFT: "neutral",
  SUSPENDED: "warning",
} as const;

type ManagerAssetListProps = {
  assets: ManagerAssetItem[];
};

export function ManagerAssetList({ assets }: ManagerAssetListProps) {
  if (assets.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="text-base font-medium text-foreground">Активів ще немає</p>
        <p className="mt-2 text-sm text-muted">
          Коли продавці додадуть пропозиції, ви зможете їх публікувати або
          призупиняти.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4">
      {assets.map((asset) => (
        <Card key={asset.id} className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              {asset.status === "PUBLISHED" ? (
                <Link
                  href={`/assets/${asset.id}`}
                  className="text-base font-semibold tracking-tight break-words text-foreground transition-colors hover:text-primary"
                >
                  {asset.title}
                </Link>
              ) : (
                <p className="text-base font-semibold tracking-tight break-words text-foreground">
                  {asset.title}
                </p>
              )}
            </div>
            <Badge variant={statusVariants[asset.status]}>
              {statusLabels[asset.status]}
            </Badge>
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                Продавець
              </dt>
              <dd className="mt-1 text-sm font-medium break-words text-foreground">
                {asset.sellerCompany}
              </dd>
              <dd className="text-sm break-all text-muted">{asset.sellerEmail}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
                Ціна пропозиції
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {formatMoney(asset.askingPrice)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-border pt-4">
            <ManagerAssetActions assetId={asset.id} status={asset.status} />
          </div>
        </Card>
      ))}
    </div>
  );
}
