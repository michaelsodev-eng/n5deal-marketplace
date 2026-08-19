import { AssetCard } from "@/components/assets/asset-card";
import { LogoutButton } from "@/components/auth/logout-button";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { BuyerDashboardData } from "@/lib/dashboard";

type BuyerDashboardProps = {
  data: BuyerDashboardData;
};

export function BuyerDashboard({ data }: BuyerDashboardProps) {
  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <p className="text-sm font-medium tracking-wide text-primary">
          Кабінет покупця
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Вітаємо, {data.companyName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Переглядайте підібрані пропозиції та відстежуйте свої запити на
              контакт.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button href="/assets">Переглянути майданчик</Button>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Збережені активи" value={data.savedCount} />
          <StatCard label="Запити на контакт" value={data.contactCount} />
          <StatCard
            label="Рекомендовані можливості"
            value={data.recommendedCount}
          />
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Рекомендовані активи
          </h2>
          {data.recommendedAssets.length > 0 ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.recommendedAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <p className="text-base font-medium text-foreground">
                Рекомендованих пропозицій поки немає
              </p>
              <p className="mt-2 text-sm text-muted">
                Відкрийте торговельний майданчик, щоб переглянути доступні
                активи.
              </p>
              <Button href="/assets" className="mt-4">
                До майданчика
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
