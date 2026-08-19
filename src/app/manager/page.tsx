import type { Metadata } from "next";
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard";
import { getManagerDashboardData } from "@/lib/dashboard";
import { requireManagerUser } from "@/lib/manager";

export const metadata: Metadata = {
  title: "Панель менеджера",
};

export default async function ManagerPage() {
  const user = await requireManagerUser();
  const data = await getManagerDashboardData();

  return <ManagerDashboard data={data} currentUserId={user.id} />;
}
