import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetDetail } from "@/components/assets/asset-detail";
import { getPublishedAssetById } from "@/lib/assets";
import { getAssetContactContext } from "@/lib/contact-requests";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const asset = await getPublishedAssetById(id);

  if (!asset) {
    return {
      title: "Актив не знайдено",
    };
  }

  return {
    title: asset.title,
    description: asset.description,
  };
}

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await getPublishedAssetById(id);

  if (!asset) {
    notFound();
  }

  const contact = await getAssetContactContext(id);

  return <AssetDetail asset={asset} contact={contact} />;
}
