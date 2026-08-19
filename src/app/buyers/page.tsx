import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuyersMarketplaceView } from "@/components/buyers/buyers-marketplace-view";
import {
  BUYER_MARKETPLACE_PAGE_SIZE,
  buildBuyerMarketplaceHref,
  parseBuyerMarketplaceSearchParams,
} from "@/lib/buyer-marketplace";
import { getBuyerMarketplacePageData } from "@/lib/buyers";

export const metadata: Metadata = {
  title: "Покупці",
  description:
    "Перегляд інвестиційних профілів покупців на N5Deal Marketplace.",
};

export default async function BuyersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseBuyerMarketplaceSearchParams(params);
  const result = await getBuyerMarketplacePageData(filters);

  if (result.ok && result.data.page !== filters.page) {
    redirect(buildBuyerMarketplaceHref({ ...filters, page: result.data.page }));
  }

  if (!result.ok) {
    return (
      <BuyersMarketplaceView
        buyers={[]}
        total={0}
        page={1}
        pageSize={BUYER_MARKETPLACE_PAGE_SIZE}
        totalPages={0}
        filters={filters}
        countries={[]}
        industries={[]}
        error={result.error}
      />
    );
  }

  return (
    <BuyersMarketplaceView
      buyers={result.data.buyers}
      total={result.data.total}
      page={result.data.page}
      pageSize={result.data.pageSize}
      totalPages={result.data.totalPages}
      filters={{ ...filters, page: result.data.page }}
      countries={result.data.countries}
      industries={result.data.industries}
    />
  );
}
