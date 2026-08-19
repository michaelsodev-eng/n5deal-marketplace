import { BuyerCard } from "@/components/buyers/buyer-card";
import type { MarketplaceBuyer } from "@/lib/buyer-marketplace";

type BuyersResultsProps = {
  buyers: MarketplaceBuyer[];
};

export function BuyersResults({ buyers }: BuyersResultsProps) {
  if (buyers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-base font-medium text-foreground">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-muted">
          Змініть пошуковий запит або очистіть фільтри, щоб побачити доступних
          покупців.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {buyers.map((buyer) => (
        <BuyerCard key={buyer.id} buyer={buyer} />
      ))}
    </div>
  );
}
