import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyerDetail } from "@/components/buyers/buyer-detail";
import { getActiveBuyerById } from "@/lib/buyers";
import { getBuyerContactContext } from "@/lib/contact-requests";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const buyer = await getActiveBuyerById(id);

  if (!buyer) {
    return {
      title: "Покупця не знайдено",
    };
  }

  return {
    title: buyer.companyName,
    description: buyer.description ?? undefined,
  };
}

export default async function BuyerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const buyer = await getActiveBuyerById(id);

  if (!buyer) {
    notFound();
  }

  const contact = await getBuyerContactContext(id);

  return <BuyerDetail buyer={buyer} contact={contact} />;
}
