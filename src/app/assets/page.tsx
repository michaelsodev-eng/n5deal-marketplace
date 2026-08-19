import type { Metadata } from "next";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";

export const metadata: Metadata = {
  title: "Торговельний майданчик",
  description:
    "Перегляд бізнесів, компаній та інвестиційних активів на N5Deal Marketplace.",
};

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return <MarketplaceView initialQuery={params.q ?? ""} />;
}
