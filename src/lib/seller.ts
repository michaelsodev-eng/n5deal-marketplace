import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export async function requireSellerUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "SELLER" || !user.sellerProfile) {
    redirect("/dashboard");
  }

  return {
    ...user,
    sellerProfile: user.sellerProfile,
  };
}
