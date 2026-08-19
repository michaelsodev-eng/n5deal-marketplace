import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import {
  BUYER_MARKETPLACE_PAGE_SIZE,
  type BuyerMarketplaceFilterState,
  type MarketplaceBuyer,
} from "@/lib/buyer-marketplace";
import { parseNumericRange } from "@/lib/marketplace";
import { prisma } from "@/lib/prisma";

export type BuyerMarketplacePageData = {
  buyers: MarketplaceBuyer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  countries: string[];
  industries: string[];
};

export type BuyerMarketplacePageResult =
  | { ok: true; data: BuyerMarketplacePageData }
  | { ok: false; error: string };

function toNumber(value: unknown): number | null {
  if (value == null) {
    return null;
  }

  return Number(value);
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "uk"),
  );
}

function mapBuyer(profile: {
  id: string;
  companyName: string;
  description: string | null;
  investmentTypes: string[];
  industries: string[];
  countries: string[];
  minInvestment: unknown;
  maxInvestment: unknown;
  acquisitionInterests: string | null;
}): MarketplaceBuyer {
  return {
    id: profile.id,
    companyName: profile.companyName,
    description: profile.description,
    investmentTypes: profile.investmentTypes,
    industries: profile.industries,
    countries: profile.countries,
    minInvestment: toNumber(profile.minInvestment),
    maxInvestment: toNumber(profile.maxInvestment),
    acquisitionInterests: profile.acquisitionInterests,
  };
}

const activeBuyerWhere: Prisma.BuyerProfileWhereInput = {
  user: {
    role: "BUYER",
    status: "ACTIVE",
  },
};

function buildWhere(
  filters: BuyerMarketplaceFilterState,
): Prisma.BuyerProfileWhereInput {
  const where: Prisma.BuyerProfileWhereInput = {
    ...activeBuyerWhere,
  };
  const conditions: Prisma.BuyerProfileWhereInput[] = [];

  if (filters.search) {
    conditions.push({
      OR: [
        { companyName: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        {
          acquisitionInterests: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (filters.country !== "all") {
    where.countries = { has: filters.country };
  }

  if (filters.industry !== "all") {
    where.industries = { has: filters.industry };
  }

  const investment = parseNumericRange(filters.investment);
  if (investment) {
    conditions.push({
      OR: [
        {
          AND: [
            { minInvestment: { lte: investment.lte } },
            { maxInvestment: { gte: investment.gte } },
          ],
        },
        {
          AND: [
            { minInvestment: { lte: investment.lte } },
            { maxInvestment: null },
          ],
        },
        {
          AND: [
            { minInvestment: null },
            { maxInvestment: { gte: investment.gte } },
          ],
        },
      ],
    });
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return where;
}

export async function getBuyerMarketplacePageData(
  filters: BuyerMarketplaceFilterState,
): Promise<BuyerMarketplacePageResult> {
  try {
    const where = buildWhere(filters);

    const [total, facetRows] = await Promise.all([
      prisma.buyerProfile.count({ where }),
      prisma.buyerProfile.findMany({
        where: activeBuyerWhere,
        select: {
          countries: true,
          industries: true,
        },
      }),
    ]);

    const totalPages =
      total === 0 ? 0 : Math.ceil(total / BUYER_MARKETPLACE_PAGE_SIZE);
    const page =
      total === 0 ? 1 : Math.min(Math.max(filters.page, 1), totalPages);
    const skip = (page - 1) * BUYER_MARKETPLACE_PAGE_SIZE;

    const rows = await prisma.buyerProfile.findMany({
      where,
      orderBy: { companyName: "asc" },
      skip,
      take: BUYER_MARKETPLACE_PAGE_SIZE,
    });

    return {
      ok: true,
      data: {
        buyers: rows.map(mapBuyer),
        total,
        page,
        pageSize: BUYER_MARKETPLACE_PAGE_SIZE,
        totalPages,
        countries: uniqueSorted(facetRows.flatMap((row) => row.countries)),
        industries: uniqueSorted(facetRows.flatMap((row) => row.industries)),
      },
    };
  } catch (error) {
    console.error("Buyer marketplace query failed", error);

    return {
      ok: false,
      error: "Не вдалося завантажити покупців. Спробуйте пізніше.",
    };
  }
}

export const getActiveBuyerById = cache(
  async (id: string): Promise<MarketplaceBuyer | null> => {
    const profile = await prisma.buyerProfile.findFirst({
      where: {
        id,
        ...activeBuyerWhere,
      },
    });

    if (!profile) {
      return null;
    }

    return mapBuyer(profile);
  },
);
