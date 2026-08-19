import type { Metadata } from "next";
import { AssetForm } from "@/components/assets/asset-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { createAssetAction } from "@/app/dashboard/assets/actions";
import { requireSellerUser } from "@/lib/seller";

export const metadata: Metadata = {
  title: "Створити актив",
};

export default async function NewAssetPage() {
  await requireSellerUser();

  return (
    <section className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { href: "/dashboard", label: "Кабінет" },
            { label: "Новий актив" },
          ]}
        />
        <p className="mt-6 text-sm font-medium tracking-wide text-primary">
          Кабінет продавця
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Створити актив
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Заповніть дані пропозиції. Чернетку можна опублікувати пізніше.
        </p>
        <AssetForm action={createAssetAction} />
      </Container>
    </section>
  );
}
