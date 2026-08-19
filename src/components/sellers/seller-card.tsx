import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountryMark } from "@/components/assets/country-mark";
import { formatNumber } from "@/lib/format";
import {
  sellerWebsiteHref,
  type MarketplaceSeller,
} from "@/lib/seller-marketplace";

type SellerCardProps = {
  seller: MarketplaceSeller;
};

export function SellerCard({ seller }: SellerCardProps) {
  const website = sellerWebsiteHref(seller.website);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_28px_rgba(15,34,64,0.08)]">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {seller.country ? <CountryMark country={seller.country} /> : null}

        <h3 className="mt-4 text-lg font-semibold tracking-tight break-words text-foreground">
          {seller.companyName}
        </h3>
        {seller.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {seller.description}
          </p>
        ) : null}

        {seller.industries.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {seller.industries.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        ) : null}

        <dl className="mt-5 overflow-hidden rounded-lg border border-border bg-slate-50/80">
          <div className="px-3 py-3">
            <dt className="text-[11px] font-medium tracking-wide text-muted uppercase">
              Опубліковані активи
            </dt>
            <dd className="mt-1 text-sm font-semibold break-words text-foreground">
              {formatNumber(seller.publishedCount)}
            </dd>
          </div>
        </dl>

        {website ? (
          <p className="mt-4 truncate text-sm text-muted">{website}</p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 sm:mt-auto sm:flex-row">
          <Button href={`/sellers/${seller.id}`} className="sm:flex-1">
            Переглянути профіль
          </Button>
        </div>
      </div>
    </Card>
  );
}
