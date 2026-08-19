import type { Metadata } from "next";
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard";
import { getManagerDashboardData } from "@/lib/dashboard";
import { parseManagerSearchParams } from "@/lib/manager-filters";
import { requireManagerUser } from "@/lib/manager";

export const metadata: Metadata = {
  title: "Панель менеджера",
};

export default async function ManagerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await requireManagerUser();
  const params = await searchParams;
  const filters = parseManagerSearchParams(params);
  const data = await getManagerDashboardData(filters);

  return (
    <ManagerDashboard
      data={data}
      currentUserId={user.id}
      filters={filters}
    />
  );
}
