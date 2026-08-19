import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { mapAsset } from "@/lib/assets";
import type { MarketplaceAsset } from "@/lib/marketplace";
import { prisma } from "@/lib/prisma";
import {
  SELLER_MARKETPLACE_PAGE_SIZE,
  type MarketplaceSeller,
  type SellerMarketplaceFilterState,
} from "@/lib/seller-marketplace";

export type SellerMarketplacePageData = {
  sellers: MarketplaceSeller[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  countries: string[];
  industries: string[];
};

export type SellerMarketplacePageResult =
  | { ok: true; data: SellerMarketplacePageData }
  | { ok: false; error: string };

export type MarketplaceSellerDetail = MarketplaceSeller & {
  assets: MarketplaceAsset[];
};

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "uk"),
  );
}

const publishedAssetWhere = {
  status: "PUBLISHED" as const,
};

const activeSellerWhere: Prisma.SellerProfileWhereInput = {
  user: {
    role: "SELLER",
    status: "ACTIVE",
  },
};

function mapSeller(profile: {
  id: string;
  companyName: string;
  description: string | null;
  country: string | null;
  website: string | null;
  assets: Array<{ industry: string }>;
}): MarketplaceSeller {
  return {
    id: profile.id,
    companyName: profile.companyName,
    description: profile.description,
    country: profile.country,
    website: profile.website,
    publishedCount: profile.assets.length,
    industries: uniqueSorted(profile.assets.map((asset) => asset.industry)),
  };
}

function buildWhere(
  filters: SellerMarketplaceFilterState,
): Prisma.SellerProfileWhereInput {
  const where: Prisma.SellerProfileWhereInput = {
    ...activeSellerWhere,
  };
  const conditions: Prisma.SellerProfileWhereInput[] = [];

  if (filters.search) {
    conditions.push({
      OR: [
        { companyName: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { website: { contains: filters.search, mode: "insensitive" } },
      ],
    });
  }

  if (filters.country !== "all") {
    where.country = filters.country;
  }

  if (filters.industry !== "all") {
    where.assets = {
      some: {
        status: "PUBLISHED",
        industry: filters.industry,
      },
    };
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return where;
}

const listSelect = {
  id: true,
  companyName: true,
  description: true,
  country: true,
  website: true,
  assets: {
    where: publishedAssetWhere,
    select: { industry: true },
  },
} as const;

export async function getSellerMarketplacePageData(
  filters: SellerMarketplaceFilterState,
): Promise<SellerMarketplacePageResult> {
  try {
    const where = buildWhere(filters);

    const [total, facetRows] = await Promise.all([
      prisma.sellerProfile.count({ where }),
      prisma.sellerProfile.findMany({
        where: activeSellerWhere,
        select: {
          country: true,
          assets: {
            where: publishedAssetWhere,
            select: { industry: true },
          },
        },
      }),
    ]);

    const totalPages =
      total === 0 ? 0 : Math.ceil(total / SELLER_MARKETPLACE_PAGE_SIZE);
    const page =
      total === 0 ? 1 : Math.min(Math.max(filters.page, 1), totalPages);
    const skip = (page - 1) * SELLER_MARKETPLACE_PAGE_SIZE;

    const rows = await prisma.sellerProfile.findMany({
      where,
      orderBy: { companyName: "asc" },
      skip,
      take: SELLER_MARKETPLACE_PAGE_SIZE,
      select: listSelect,
    });

    return {
      ok: true,
      data: {
        sellers: rows.map(mapSeller),
        total,
        page,
        pageSize: SELLER_MARKETPLACE_PAGE_SIZE,
        totalPages,
        countries: uniqueSorted(
          facetRows
            .map((row) => row.country)
            .filter((value): value is string => Boolean(value)),
        ),
        industries: uniqueSorted(
          facetRows.flatMap((row) => row.assets.map((asset) => asset.industry)),
        ),
      },
    };
  } catch (error) {
    console.error("Seller marketplace query failed", error);

    return {
      ok: false,
      error: "Не вдалося завантажити продавців. Спробуйте пізніше.",
    };
  }
}

export const getActiveSellerById = cache(
  async (id: string): Promise<MarketplaceSellerDetail | null> => {
    const profile = await prisma.sellerProfile.findFirst({
      where: {
        id,
        ...activeSellerWhere,
      },
      include: {
        assets: {
          where: publishedAssetWhere,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!profile) {
      return null;
    }

    return {
      ...mapSeller({
        id: profile.id,
        companyName: profile.companyName,
        description: profile.description,
        country: profile.country,
        website: profile.website,
        assets: profile.assets,
      }),
      assets: profile.assets.map(mapAsset),
    };
  },
);
