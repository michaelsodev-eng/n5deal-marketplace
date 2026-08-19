import { SellerCard } from "@/components/sellers/seller-card";
import type { MarketplaceSeller } from "@/lib/seller-marketplace";

type SellersResultsProps = {
  sellers: MarketplaceSeller[];
};

export function SellersResults({ sellers }: SellersResultsProps) {
  if (sellers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-muted">
          Змініть пошуковий запит або очистіть фільтри, щоб побачити доступних
          продавців.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {sellers.map((seller) => (
        <SellerCard key={seller.id} seller={seller} />
      ))}
    </div>
  );
}
