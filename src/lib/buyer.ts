import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ParsedBuyerProfileInput } from "@/lib/buyer-profile-form";

export async function requireBuyerUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "BUYER" || !user.buyerProfile) {
    redirect("/dashboard");
  }

  return {
    ...user,
    buyerProfile: user.buyerProfile,
  };
}

export type BuyerProfileData = {
  companyName: string;
  description: string;
  investmentTypes: string[];
  industries: string[];
  countries: string[];
  minInvestment: string;
  maxInvestment: string;
  acquisitionInterests: string;
};

function toInputValue(value: unknown): string {
  if (value == null) {
    return "";
  }

  return String(Number(value));
}

export async function getBuyerProfileByUserId(
  userId: string,
): Promise<BuyerProfileData | null> {
  const profile = await prisma.buyerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return null;
  }

  return {
    companyName: profile.companyName,
    description: profile.description ?? "",
    investmentTypes: profile.investmentTypes,
    industries: profile.industries,
    countries: profile.countries,
    minInvestment: toInputValue(profile.minInvestment),
    maxInvestment: toInputValue(profile.maxInvestment),
    acquisitionInterests: profile.acquisitionInterests ?? "",
  };
}

export async function updateOwnedBuyerProfile(input: {
  userId: string;
  data: ParsedBuyerProfileInput;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const updated = await prisma.buyerProfile.updateMany({
    where: { userId: input.userId },
    data: {
      companyName: input.data.companyName,
      description: input.data.description,
      investmentTypes: input.data.investmentTypes,
      industries: input.data.industries,
      countries: input.data.countries,
      minInvestment: input.data.minInvestment,
      maxInvestment: input.data.maxInvestment,
      acquisitionInterests: input.data.acquisitionInterests,
    },
  });

  if (updated.count === 0) {
    return { ok: false, error: "Профіль не знайдено або ви не можете його змінити." };
  }

  return { ok: true };
}
