import { AssetCard } from "@/components/assets/asset-card";
import { LogoutButton } from "@/components/auth/logout-button";
import { ContactRequestList } from "@/components/dashboard/contact-request-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import type { ManagerDashboardData } from "@/lib/dashboard";

const roleLabels = {
  BUYER: "Покупець",
  SELLER: "Продавець",
  MANAGER: "Менеджер",
} as const;

type ManagerDashboardProps = {
  data: ManagerDashboardData;
};

export function ManagerDashboard({ data }: ManagerDashboardProps) {
  return (
    <section className="py-8 sm:py-12">
      <Container size="full">
        <p className="text-sm font-medium tracking-wide text-primary">
          Панель менеджера
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Огляд майданчика
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Контролюйте користувачів, опубліковані активи та активність запитів.
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Користувачі" value={data.userCount} />
          <StatCard label="Покупці" value={data.buyerCount} />
          <StatCard label="Продавці" value={data.sellerCount} />
          <StatCard
            label="Опубліковані активи"
            value={data.publishedAssetCount}
          />
          <StatCard label="Запити на контакт" value={data.contactCount} />
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Нещодавні користувачі
            </h2>
            {data.recentUsers.length > 0 ? (
              <Card className="mt-4 divide-y divide-border overflow-hidden">
                {data.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {user.companyName ?? user.email}
                      </p>
                      <p className="text-sm text-muted">{user.email}</p>
                    </div>
                    <div className="text-sm text-muted sm:text-right">
                      <p>{roleLabels[user.role]}</p>
                      <p>{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </Card>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
                <p className="text-base font-medium text-foreground">
                  Користувачів ще немає
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Опубліковані активи
            </h2>
            {data.recentAssets.length > 0 ? (
              <div className="mt-4 grid gap-4">
                {data.recentAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
                <p className="text-base font-medium text-foreground">
                  Опублікованих активів немає
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Запити на контакт
          </h2>
          <ContactRequestList
            requests={data.contactRequests}
            variant="manager"
            emptyTitle="Запитів на контакт ще немає"
            emptyDescription="Усі запити покупців до продавців з’являться в цьому списку."
          />
        </div>
      </Container>
    </section>
  );
}
