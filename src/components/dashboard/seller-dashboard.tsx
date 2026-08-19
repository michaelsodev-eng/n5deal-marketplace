import { AssetCard } from "@/components/assets/asset-card";
import { LogoutButton } from "@/components/auth/logout-button";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { SellerDashboardData } from "@/lib/dashboard";

type SellerDashboardProps = {
  data: SellerDashboardData;
};

export function SellerDashboard({ data }: SellerDashboardProps) {
  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <p className="text-sm font-medium tracking-wide text-primary">
          Кабінет продавця
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Вітаємо, {data.companyName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Керуйте своїми активами та переглядайте вхідні запити від
              покупців.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button href="/dashboard/assets/new">Створити актив</Button>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Опубліковані активи" value={data.publishedCount} />
          <StatCard label="Чернетки активів" value={data.draftCount} />
          <StatCard label="Запити на контакт" value={data.contactCount} />
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Ваші активи
          </h2>
          {data.assets.length > 0 ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  editHref={`/dashboard/assets/${asset.id}/edit`}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <p className="text-base font-medium text-foreground">
                Активів ще немає
              </p>
              <p className="mt-2 text-sm text-muted">
                Створіть першу пропозицію, щоб вона з’явилася в кабінеті.
              </p>
              <Button href="/dashboard/assets/new" className="mt-4">
                Створити актив
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
