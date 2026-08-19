import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetForm } from "@/components/assets/asset-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { updateAssetAction } from "@/app/dashboard/assets/actions";
import { getSellerOwnedAsset } from "@/lib/assets";
import { requireSellerUser } from "@/lib/seller";

type EditAssetPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditAssetPageProps): Promise<Metadata> {
  const seller = await requireSellerUser();
  const { id } = await params;
  const asset = await getSellerOwnedAsset(id, seller.sellerProfile.id);

  if (!asset) {
    return {
      title: "Актив не знайдено",
    };
  }

  return {
    title: `Редагувати: ${asset.title}`,
  };
}

export default async function EditAssetPage({ params }: EditAssetPageProps) {
  const seller = await requireSellerUser();
  const { id } = await params;
  const asset = await getSellerOwnedAsset(id, seller.sellerProfile.id);

  if (!asset) {
    notFound();
  }

  const updateAction = updateAssetAction.bind(null, asset.id);

  return (
    <section className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { href: "/dashboard", label: "Кабінет" },
            { label: asset.title },
          ]}
        />
        <p className="mt-6 text-sm font-medium tracking-wide text-primary">
          Кабінет продавця
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Редагувати актив
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Оновіть дані пропозиції та збережіть чернетку або опублікуйте актив.
        </p>
        <AssetForm
          action={updateAction}
          defaults={{
            title: asset.title,
            description: asset.description,
            assetType: asset.assetType,
            industry: asset.industry,
            country: asset.country,
            askingPrice: String(asset.askingPrice),
            revenue: asset.revenue != null ? String(asset.revenue) : "",
            ebitda: asset.ebitda != null ? String(asset.ebitda) : "",
            employees: asset.employees != null ? String(asset.employees) : "",
          }}
        />
      </Container>
    </section>
  );
}
