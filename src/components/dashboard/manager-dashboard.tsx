import { LogoutButton } from "@/components/auth/logout-button";
import { ContactRequestList } from "@/components/dashboard/contact-request-list";
import { ManagerAssetList } from "@/components/dashboard/manager-asset-list";
import { ManagerFilters } from "@/components/dashboard/manager-filters";
import { ManagerUserList } from "@/components/dashboard/manager-user-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Container } from "@/components/ui/container";
import type { ManagerDashboardData } from "@/lib/dashboard";
import {
  hasActiveAssetFilters,
  hasActiveUserFilters,
  type ManagerFilterState,
} from "@/lib/manager-filters";

type ManagerDashboardProps = {
  data: ManagerDashboardData;
  currentUserId: string;
  filters: ManagerFilterState;
};

export function ManagerDashboard({
  data,
  currentUserId,
  filters,
}: ManagerDashboardProps) {
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

        <ManagerFilters filters={filters} />

        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Користувачі
          </h2>
          <ManagerUserList
            users={data.users}
            currentUserId={currentUserId}
            filtered={hasActiveUserFilters(filters)}
          />
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Активи
          </h2>
          <ManagerAssetList
            assets={data.managedAssets}
            filtered={hasActiveAssetFilters(filters)}
          />
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
