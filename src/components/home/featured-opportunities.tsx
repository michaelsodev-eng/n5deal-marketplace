import { AssetCard } from "@/components/assets/asset-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedAssets } from "@/data/assets";

export function FeaturedOpportunities() {
  const assets = getFeaturedAssets();

  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Можливості"
          title="Запропоновані активи"
          description="Добірка актуальних бізнесів і компаній, доступних для перегляду на торговельному майданчику."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </Container>
    </section>
  );
}
