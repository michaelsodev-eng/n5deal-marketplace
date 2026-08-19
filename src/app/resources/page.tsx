import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Ресурси",
};

const items = [
  {
    title: "Огляд показників угоди",
    description:
      "Як читати ціну пропозиції, дохід, EBITDA та чисельність команди під час первинної оцінки.",
  },
  {
    title: "Підготовка до продажу",
    description:
      "Що варто структурувати перед публікацією бізнесу: опис, галузь, географія та фінансові дані.",
  },
  {
    title: "Процес контакту",
    description:
      "Короткий гід із того, як покупці ініціюють діалог і як продавці відповідають на запити.",
  },
];

export default function ResourcesPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <SectionHeading
          eyebrow="Ресурси"
          title="Матеріали для покупців і продавців"
          description="Корисні матеріали для підготовки до угоди. Цей розділ буде розширено пізніше."
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
