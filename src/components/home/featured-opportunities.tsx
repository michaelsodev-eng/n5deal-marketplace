import { AssetCard } from "@/components/assets/asset-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedPublishedAssets } from "@/lib/assets";

export async function FeaturedOpportunities() {
  const assets = await getFeaturedPublishedAssets();

  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          eyebrow="Можливості"
          title="Запропоновані активи"
          description="Добірка актуальних бізнесів і компаній, доступних для перегляду на торговельному майданчику."
        />
        {assets.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground">
              Пропозицій поки немає
            </p>
            <p className="mt-2 text-sm text-muted">
              Відкрийте торговельний майданчик, щойно з’являться опубліковані
              активи.
            </p>
            <Button href="/assets" className="mt-4">
              До майданчика
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
