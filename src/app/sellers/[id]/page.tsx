import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SellerDetail } from "@/components/sellers/seller-detail";
import { getActiveSellerById } from "@/lib/sellers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seller = await getActiveSellerById(id);

  if (!seller) {
    return {
      title: "Продавця не знайдено",
    };
  }

  return {
    title: seller.companyName,
    description: seller.description ?? undefined,
  };
}

export default async function SellerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = await getActiveSellerById(id);

  if (!seller) {
    notFound();
  }

  return <SellerDetail seller={seller} />;
}
