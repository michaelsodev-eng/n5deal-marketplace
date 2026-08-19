import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyerProfileForm } from "@/components/dashboard/buyer-profile-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getBuyerProfileByUserId, requireBuyerUser } from "@/lib/buyer";

export const metadata: Metadata = {
  title: "Профіль",
};

export default async function BuyerProfilePage() {
  const buyer = await requireBuyerUser();
  const profile = await getBuyerProfileByUserId(buyer.id);

  if (!profile) {
    notFound();
  }

  return (
    <section className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { href: "/dashboard", label: "Кабінет" },
            { label: "Профіль" },
          ]}
        />
        <p className="mt-6 text-sm font-medium tracking-wide text-primary">
          Кабінет покупця
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight break-words text-foreground sm:text-3xl">
          Профіль
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Оновіть дані компанії та інвестиційні критерії, щоб отримувати доречніші
          рекомендації.
        </p>
        <BuyerProfileForm defaults={profile} />
      </Container>
    </section>
  );
}
