import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuyerDashboard } from "@/components/dashboard/buyer-dashboard";
import { SellerDashboard } from "@/components/dashboard/seller-dashboard";
import { getCurrentUser } from "@/lib/auth";
import { getBuyerDashboardData, getSellerDashboardData } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Кабінет",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "MANAGER") {
    redirect("/manager");
  }

  if (user.role === "SELLER") {
    const data = await getSellerDashboardData({
      userId: user.id,
      sellerProfileId: user.sellerProfile?.id ?? null,
      companyName: user.sellerProfile?.companyName ?? user.email,
    });

    return <SellerDashboard data={data} />;
  }

  const data = await getBuyerDashboardData({
    userId: user.id,
    companyName: user.buyerProfile?.companyName ?? user.email,
    industries: user.buyerProfile?.industries ?? [],
    countries: user.buyerProfile?.countries ?? [],
  });

  return <BuyerDashboard data={data} />;
}
