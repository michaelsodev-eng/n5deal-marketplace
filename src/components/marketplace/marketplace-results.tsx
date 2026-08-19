import { AssetCard } from "@/components/assets/asset-card";
import type { MockAsset } from "@/data/assets";

type MarketplaceResultsProps = {
  assets: MockAsset[];
};

export function MarketplaceResults({ assets }: MarketplaceResultsProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-muted">
          Змініть пошуковий запит або очистіть фільтри, щоб побачити доступні
          пропозиції.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
