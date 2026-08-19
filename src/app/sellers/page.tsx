import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Продавці",
};

const items = [
  {
    title: "Підготуйте профіль бізнесу",
    description:
      "Опишіть актив, галузь, країну та ключові фінансові показники в єдиному форматі.",
  },
  {
    title: "Охопіть кваліфікованих покупців",
    description:
      "Ваша пропозиція стає доступною інвесторам, які шукають угоди у вашому сегменті.",
  },
  {
    title: "Керуйте запитами",
    description:
      "Отримуйте звернення зацікавлених сторін і відстежуйте статус контактів.",
  },
];

export default function SellersPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="wide">
        <SectionHeading
          eyebrow="Для продавців"
          title="Продайте бізнес через професійний майданчик"
          description="Розміщуйте компанії та активи в структурованому каталозі, зручному для B2B-покупців і інвестиційних команд."
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
