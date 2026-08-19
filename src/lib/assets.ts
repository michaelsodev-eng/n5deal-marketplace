import { cache } from "react";
import type { Asset, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  MARKETPLACE_PAGE_SIZE,
  parseNumericRange,
  type MarketplaceAsset,
  type MarketplaceFilterState,
  type SortKey,
} from "@/lib/marketplace";

export type MarketplacePageData = {
  assets: MarketplaceAsset[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  countries: string[];
  industries: string[];
  assetTypes: string[];
};

export type MarketplacePageResult =
  | { ok: true; data: MarketplacePageData }
  | { ok: false; error: string };

function toNumber(value: Asset["askingPrice"] | null): number | null {
  if (value == null) {
    return null;
  }

  return Number(value);
}

export function mapAsset(asset: Asset): MarketplaceAsset {
  return {
    id: asset.id,
    title: asset.title,
    description: asset.description,
    assetType: asset.assetType,
    industry: asset.industry,
    country: asset.country,
    askingPrice: Number(asset.askingPrice),
    revenue: toNumber(asset.revenue),
    ebitda: toNumber(asset.ebitda),
    employees: asset.employees,
    foundedYear: null,
    listedAt: asset.createdAt.toISOString(),
    status: asset.status,
  };
}

function buildWhere(
  filters: MarketplaceFilterState,
): Prisma.AssetWhereInput {
  const where: Prisma.AssetWhereInput = {
    status: "PUBLISHED",
  };
  const conditions: Prisma.AssetWhereInput[] = [];

  if (filters.search) {
    conditions.push({
      OR: [
        { title: { contains: filters.search, mode: "insensitive" } },
        { country: { contains: filters.search, mode: "insensitive" } },
        { industry: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ],
    });
  }

  if (filters.country !== "all") {
    where.country = filters.country;
  }

  if (filters.industry !== "all") {
    where.industry = filters.industry;
  }

  if (filters.assetType !== "all") {
    where.assetType = filters.assetType;
  }

  const price = parseNumericRange(filters.price);
  if (price) {
    where.askingPrice = price;
  }

  const revenue = parseNumericRange(filters.revenue);
  if (revenue) {
    where.revenue = revenue;
  }

  const ebitda = parseNumericRange(filters.ebitda);
  if (ebitda) {
    where.ebitda = ebitda;
  }

  const employees = parseNumericRange(filters.employees);
  if (employees) {
    where.employees = employees;
  }

  if (conditions.length > 0) {
    where.AND = conditions;
  }

  return where;
}

function buildOrderBy(
  sort: SortKey,
): Prisma.AssetOrderByWithRelationInput {
  if (sort === "price-asc") {
    return { askingPrice: "asc" };
  }

  if (sort === "price-desc") {
    return { askingPrice: "desc" };
  }

  if (sort === "ebitda-desc") {
    return { ebitda: { sort: "desc", nulls: "last" } };
  }

  return { createdAt: "desc" };
}

export const getPublishedAssetById = cache(
  async (id: string): Promise<MarketplaceAsset | null> => {
    const asset = await prisma.asset.findFirst({
      where: {
        id,
        status: "PUBLISHED",
      },
    });

    if (!asset) {
      return null;
    }

    return mapAsset(asset);
  },
);

export async function getMarketplacePageData(
  filters: MarketplaceFilterState,
): Promise<MarketplacePageResult> {
  try {
    const where = buildWhere(filters);
    const orderBy = buildOrderBy(filters.sort);
    const publishedWhere: Prisma.AssetWhereInput = { status: "PUBLISHED" };

    const [total, countryRows, industryRows, assetTypeRows] = await Promise.all([
      prisma.asset.count({ where }),
      prisma.asset.findMany({
        where: publishedWhere,
        distinct: ["country"],
        select: { country: true },
        orderBy: { country: "asc" },
      }),
      prisma.asset.findMany({
        where: publishedWhere,
        distinct: ["industry"],
        select: { industry: true },
        orderBy: { industry: "asc" },
      }),
      prisma.asset.findMany({
        where: publishedWhere,
        distinct: ["assetType"],
        select: { assetType: true },
        orderBy: { assetType: "asc" },
      }),
    ]);

    const totalPages =
      total === 0 ? 0 : Math.ceil(total / MARKETPLACE_PAGE_SIZE);
    const page =
      total === 0 ? 1 : Math.min(Math.max(filters.page, 1), totalPages);
    const skip = (page - 1) * MARKETPLACE_PAGE_SIZE;

    const rows = await prisma.asset.findMany({
      where,
      orderBy,
      skip,
      take: MARKETPLACE_PAGE_SIZE,
    });

    return {
      ok: true,
      data: {
        assets: rows.map(mapAsset),
        total,
        page,
        pageSize: MARKETPLACE_PAGE_SIZE,
        totalPages,
        countries: countryRows.map((row) => row.country),
        industries: industryRows.map((row) => row.industry),
        assetTypes: assetTypeRows.map((row) => row.assetType),
      },
    };
  } catch (error) {
    console.error("Marketplace assets query failed", error);

    return {
      ok: false,
      error: "Не вдалося завантажити пропозиції. Спробуйте пізніше.",
    };
  }
}
