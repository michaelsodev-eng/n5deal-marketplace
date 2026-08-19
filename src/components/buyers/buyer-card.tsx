import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountryMark } from "@/components/assets/country-mark";
import type { MarketplaceBuyer } from "@/lib/buyer-marketplace";
import { formatInvestmentRange } from "@/lib/format";

type BuyerCardProps = {
  buyer: MarketplaceBuyer;
};

export function BuyerCard({ buyer }: BuyerCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_28px_rgba(15,34,64,0.08)]">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {buyer.countries.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {buyer.countries.slice(0, 3).map((country) => (
              <CountryMark key={country} country={country} />
            ))}
          </div>
        ) : null}

        <h3 className="mt-4 text-lg font-semibold tracking-tight break-words text-foreground">
          {buyer.companyName}
        </h3>
        {buyer.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {buyer.description}
          </p>
        ) : null}

        {buyer.investmentTypes.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {buyer.investmentTypes.map((item) => (
              <Badge key={item} variant="neutral">
                {item}
              </Badge>
            ))}
          </div>
        ) : null}

        {buyer.industries.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {buyer.industries.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        ) : null}

        <dl className="mt-5 overflow-hidden rounded-lg border border-border bg-slate-50/80">
          <div className="px-3 py-3">
            <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
              Діапазон інвестицій
            </dt>
            <dd className="mt-1 text-sm font-semibold break-words text-foreground">
              {formatInvestmentRange(buyer.minInvestment, buyer.maxInvestment)}
            </dd>
          </div>
        </dl>

        {buyer.acquisitionInterests ? (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
            {buyer.acquisitionInterests}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:mt-auto sm:flex-row">
          <Button href={`/buyers/${buyer.id}`} className="sm:flex-1">
            Переглянути профіль
          </Button>
        </div>
      </div>
    </Card>
  );
}
