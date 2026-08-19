import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { getMarketplacePageData } from "@/lib/assets";
import {
  MARKETPLACE_PAGE_SIZE,
  buildMarketplaceHref,
  parseMarketplaceSearchParams,
} from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Торговельний майданчик",
  description:
    "Перегляд бізнесів, компаній та інвестиційних активів на N5Deal Marketplace.",
};

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseMarketplaceSearchParams(params);
  const result = await getMarketplacePageData(filters);

  if (result.ok && result.data.page !== filters.page) {
    redirect(buildMarketplaceHref({ ...filters, page: result.data.page }));
  }

  if (!result.ok) {
    return (
      <MarketplaceView
        assets={[]}
        total={0}
        page={1}
        pageSize={MARKETPLACE_PAGE_SIZE}
        totalPages={0}
        filters={filters}
        countries={[]}
        industries={[]}
        assetTypes={[]}
        error={result.error}
      />
    );
  }

  return (
    <MarketplaceView
      assets={result.data.assets}
      total={result.data.total}
      page={result.data.page}
      pageSize={result.data.pageSize}
      totalPages={result.data.totalPages}
      filters={{ ...filters, page: result.data.page }}
      countries={result.data.countries}
      industries={result.data.industries}
      assetTypes={result.data.assetTypes}
    />
  );
}
