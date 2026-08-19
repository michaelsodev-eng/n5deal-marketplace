import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SellersMarketplaceView } from "@/components/sellers/sellers-marketplace-view";
import {
  SELLER_MARKETPLACE_PAGE_SIZE,
  buildSellerMarketplaceHref,
  parseSellerMarketplaceSearchParams,
} from "@/lib/seller-marketplace";
import { getSellerMarketplacePageData } from "@/lib/sellers";

export const metadata: Metadata = {
  title: "Продавці",
  description:
    "Перегляд компаній, які продають бізнес і активи на N5Deal Marketplace.",
};

export default async function SellersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseSellerMarketplaceSearchParams(params);
  const result = await getSellerMarketplacePageData(filters);

  if (result.ok && result.data.page !== filters.page) {
    redirect(buildSellerMarketplaceHref({ ...filters, page: result.data.page }));
  }

  if (!result.ok) {
    return (
      <SellersMarketplaceView
        sellers={[]}
        total={0}
        page={1}
        pageSize={SELLER_MARKETPLACE_PAGE_SIZE}
        totalPages={0}
        filters={filters}
        countries={[]}
        industries={[]}
        error={result.error}
      />
    );
  }

  return (
    <SellersMarketplaceView
      sellers={result.data.sellers}
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
