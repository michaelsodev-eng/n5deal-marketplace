import { prisma } from "@/lib/prisma";
import { mapAsset } from "@/lib/assets";
import {
  getAllContactRequests,
  getIncomingContactRequests,
  getSentContactRequests,
  type ContactRequestListItem,
} from "@/lib/contact-requests";
import type { MarketplaceAsset } from "@/lib/marketplace";

export type BuyerDashboardData = {
  companyName: string;
  savedCount: number;
  contactCount: number;
  recommendedCount: number;
  recommendedAssets: MarketplaceAsset[];
  sentRequests: ContactRequestListItem[];
};

export type SellerDashboardData = {
  companyName: string;
  publishedCount: number;
  draftCount: number;
  contactCount: number;
  assets: MarketplaceAsset[];
  incomingRequests: ContactRequestListItem[];
};

export type ManagerRecentUser = {
  id: string;
  email: string;
  role: "BUYER" | "SELLER" | "MANAGER";
  companyName: string | null;
  createdAt: string;
};

export type ManagerDashboardData = {
  userCount: number;
  buyerCount: number;
  sellerCount: number;
  publishedAssetCount: number;
  contactCount: number;
  recentUsers: ManagerRecentUser[];
  recentAssets: MarketplaceAsset[];
  contactRequests: ContactRequestListItem[];
};

export async function getBuyerDashboardData(input: {
  userId: string;
  companyName: string;
  industries: string[];
  countries: string[];
}): Promise<BuyerDashboardData> {
  const interestFilters = [
    ...(input.industries.length > 0
      ? [{ industry: { in: input.industries } }]
      : []),
    ...(input.countries.length > 0
      ? [{ country: { in: input.countries } }]
      : []),
  ];

  const recommendedWhere = {
    status: "PUBLISHED" as const,
    ...(interestFilters.length > 0 ? { OR: interestFilters } : {}),
  };

  const [contactCount, recommendedCount, recommendedRows, sentRequests] =
    await Promise.all([
      prisma.contactRequest.count({
        where: { senderId: input.userId },
      }),
      prisma.asset.count({
        where: recommendedWhere,
      }),
      prisma.asset.findMany({
        where: recommendedWhere,
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      getSentContactRequests(input.userId),
    ]);

  return {
    companyName: input.companyName,
    savedCount: 0,
    contactCount,
    recommendedCount,
    recommendedAssets: recommendedRows.map(mapAsset),
    sentRequests,
  };
}

export async function getSellerDashboardData(input: {
  userId: string;
  sellerProfileId: string | null;
  companyName: string;
}): Promise<SellerDashboardData> {
  if (!input.sellerProfileId) {
    return {
      companyName: input.companyName,
      publishedCount: 0,
      draftCount: 0,
      contactCount: 0,
      assets: [],
      incomingRequests: [],
    };
  }

  const [publishedCount, draftCount, contactCount, assetRows, incomingRequests] =
    await Promise.all([
      prisma.asset.count({
        where: {
          sellerId: input.sellerProfileId,
          status: "PUBLISHED",
        },
      }),
      prisma.asset.count({
        where: {
          sellerId: input.sellerProfileId,
          status: "DRAFT",
        },
      }),
      prisma.contactRequest.count({
        where: { recipientId: input.userId },
      }),
      prisma.asset.findMany({
        where: { sellerId: input.sellerProfileId },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      getIncomingContactRequests(input.userId),
    ]);

  return {
    companyName: input.companyName,
    publishedCount,
    draftCount,
    contactCount,
    assets: assetRows.map(mapAsset),
    incomingRequests,
  };
}

export async function getManagerDashboardData(): Promise<ManagerDashboardData> {
  const [
    userCount,
    buyerCount,
    sellerCount,
    publishedAssetCount,
    contactCount,
    recentUserRows,
    recentAssetRows,
    contactRequests,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "BUYER" } }),
    prisma.user.count({ where: { role: "SELLER" } }),
    prisma.asset.count({ where: { status: "PUBLISHED" } }),
    prisma.contactRequest.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        buyerProfile: { select: { companyName: true } },
        sellerProfile: { select: { companyName: true } },
      },
    }),
    prisma.asset.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    getAllContactRequests(),
  ]);

  return {
    userCount,
    buyerCount,
    sellerCount,
    publishedAssetCount,
    contactCount,
    recentUsers: recentUserRows.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      companyName:
        user.buyerProfile?.companyName ?? user.sellerProfile?.companyName ?? null,
      createdAt: user.createdAt.toISOString(),
    })),
    recentAssets: recentAssetRows.map(mapAsset),
    contactRequests,
  };
}
