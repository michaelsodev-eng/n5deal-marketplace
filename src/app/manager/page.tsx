import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ManagerDashboard } from "@/components/dashboard/manager-dashboard";
import { getCurrentUser } from "@/lib/auth";
import { getManagerDashboardData } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Панель менеджера",
};

export default async function ManagerPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  const data = await getManagerDashboardData();

  return <ManagerDashboard data={data} />;
}
