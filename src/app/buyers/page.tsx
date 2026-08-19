import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Покупці",
};

const items = [
  {
    title: "Доступ до угод",
    description:
      "Переглядайте компанії та активи, відібрані для стратегічних і фінансових покупців.",
  },
  {
    title: "Фільтри за критеріями",
    description:
      "Шукайте можливості за країною, галуззю, доходом і діапазоном інвестицій.",
  },
  {
    title: "Прямий контакт",
    description:
      "Залишайте запити продавцям після попереднього перегляду ключових показників угоди.",
  },
];

export default function BuyersPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <SectionHeading
          eyebrow="Для покупців"
          title="Знаходьте бізнеси, готові до угоди"
          description="N5Deal Marketplace допомагає інвесторам і стратегічним покупцям швидко оцінювати активи за прозорими фінансовими показниками."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="p-6">
              <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
