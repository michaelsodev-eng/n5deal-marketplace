import type { ContactStatus } from "@/generated/prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ContactRequestStatus = ContactStatus;

export type ContactRequestListItem = {
  id: string;
  message: string;
  status: ContactRequestStatus;
  createdAt: string;
  assetId: string | null;
  assetTitle: string | null;
  buyerEmail: string;
  buyerCompany: string | null;
  sellerEmail: string;
  sellerCompany: string | null;
};

export type AssetContactContext =
  | { mode: "guest" }
  | { mode: "buyer"; hasPending: boolean }
  | { mode: "unavailable" };

export type BuyerContactContext =
  | { mode: "guest" }
  | { mode: "seller"; hasPending: boolean }
  | { mode: "unavailable" };

export type CreateContactRequestResult =
  | { ok: true }
  | { ok: false; error: string };

export const contactStatusLabels: Record<ContactRequestStatus, string> = {
  PENDING: "Очікує",
  ACCEPTED: "Прийнято",
  DECLINED: "Відхилено",
};

export const contactStatusVariants: Record<
  ContactRequestStatus,
  "success" | "neutral" | "warning"
> = {
  PENDING: "warning",
  ACCEPTED: "success",
  DECLINED: "neutral",
};

const profileSelect = {
  select: {
    email: true,
    buyerProfile: {
      select: { companyName: true },
    },
    sellerProfile: {
      select: { companyName: true },
    },
  },
} as const;

const listInclude = {
  sender: profileSelect,
  recipient: profileSelect,
  asset: {
    select: {
      id: true,
      title: true,
    },
  },
} as const;

type ContactParty = {
  email: string;
  buyerProfile: { companyName: string } | null;
  sellerProfile: { companyName: string } | null;
};

type ContactRequestRow = {
  id: string;
  message: string;
  status: ContactRequestStatus;
  createdAt: Date;
  assetId: string | null;
  sender: ContactParty;
  recipient: ContactParty;
  asset: { id: string; title: string } | null;
};

function mapContactRequest(row: ContactRequestRow): ContactRequestListItem {
  const buyer = row.sender.buyerProfile ? row.sender : row.recipient;
  const seller = row.sender.sellerProfile ? row.sender : row.recipient;

  return {
    id: row.id,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    assetId: row.asset?.id ?? row.assetId,
    assetTitle: row.asset?.title ?? null,
    buyerEmail: buyer.email,
    buyerCompany: buyer.buyerProfile?.companyName ?? null,
    sellerEmail: seller.email,
    sellerCompany: seller.sellerProfile?.companyName ?? null,
  };
}

export async function getAssetContactContext(
  assetId: string,
): Promise<AssetContactContext> {
  const user = await getCurrentUser();

  if (!user) {
    return { mode: "guest" };
  }

  if (user.role !== "BUYER") {
    return { mode: "unavailable" };
  }

  const asset = await prisma.asset.findFirst({
    where: {
      id: assetId,
      status: "PUBLISHED",
    },
    select: {
      seller: {
        select: { userId: true },
      },
    },
  });

  if (!asset || asset.seller.userId === user.id) {
    return { mode: "unavailable" };
  }

  const pending = await prisma.contactRequest.findFirst({
    where: {
      senderId: user.id,
      assetId,
      status: "PENDING",
    },
    select: { id: true },
  });

  return {
    mode: "buyer",
    hasPending: Boolean(pending),
  };
}

export async function createBuyerContactRequest(input: {
  buyerId: string;
  assetId: string;
  message: string;
}): Promise<CreateContactRequestResult> {
  const asset = await prisma.asset.findFirst({
    where: { id: input.assetId },
    include: {
      seller: {
        select: { userId: true },
      },
    },
  });

  if (!asset) {
    return { ok: false, error: "Актив не знайдено." };
  }

  if (asset.status !== "PUBLISHED") {
    return { ok: false, error: "Актив недоступний для запитів." };
  }

  if (asset.seller.userId === input.buyerId) {
    return { ok: false, error: "Ви не можете надіслати запит щодо власного активу." };
  }

  const duplicate = await prisma.contactRequest.findFirst({
    where: {
      senderId: input.buyerId,
      assetId: asset.id,
      status: "PENDING",
    },
    select: { id: true },
  });

  if (duplicate) {
    return { ok: false, error: "Запит щодо цього активу вже надіслано." };
  }

  await prisma.contactRequest.create({
    data: {
      senderId: input.buyerId,
      recipientId: asset.seller.userId,
      assetId: asset.id,
      message: input.message,
      status: "PENDING",
    },
  });

  return { ok: true };
}

export async function getBuyerContactContext(
  buyerProfileId: string,
): Promise<BuyerContactContext> {
  const user = await getCurrentUser();

  if (!user) {
    return { mode: "guest" };
  }

  if (user.role !== "SELLER") {
    return { mode: "unavailable" };
  }

  const buyer = await prisma.buyerProfile.findFirst({
    where: {
      id: buyerProfileId,
      user: {
        role: "BUYER",
        status: "ACTIVE",
      },
    },
    select: { userId: true },
  });

  if (!buyer || buyer.userId === user.id) {
    return { mode: "unavailable" };
  }

  const pending = await prisma.contactRequest.findFirst({
    where: {
      senderId: user.id,
      recipientId: buyer.userId,
      status: "PENDING",
    },
    select: { id: true },
  });

  return {
    mode: "seller",
    hasPending: Boolean(pending),
  };
}

export async function createSellerContactRequest(input: {
  sellerId: string;
  buyerProfileId: string;
  message: string;
}): Promise<CreateContactRequestResult> {
  const buyer = await prisma.buyerProfile.findFirst({
    where: {
      id: input.buyerProfileId,
      user: {
        role: "BUYER",
        status: "ACTIVE",
      },
    },
    select: { userId: true },
  });

  if (!buyer) {
    return { ok: false, error: "Покупця не знайдено або профіль недоступний." };
  }

  if (buyer.userId === input.sellerId) {
    return { ok: false, error: "Ви не можете надіслати запит самому собі." };
  }

  const duplicate = await prisma.contactRequest.findFirst({
    where: {
      senderId: input.sellerId,
      recipientId: buyer.userId,
      status: "PENDING",
    },
    select: { id: true },
  });

  if (duplicate) {
    return { ok: false, error: "Запит цьому покупцю вже надіслано." };
  }

  await prisma.contactRequest.create({
    data: {
      senderId: input.sellerId,
      recipientId: buyer.userId,
      message: input.message,
      status: "PENDING",
    },
  });

  return { ok: true };
}

export async function respondToContactRequest(input: {
  requestId: string;
  recipientId: string;
  status: Exclude<ContactRequestStatus, "PENDING">;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const updated = await prisma.contactRequest.updateMany({
    where: {
      id: input.requestId,
      recipientId: input.recipientId,
      status: "PENDING",
    },
    data: {
      status: input.status,
    },
  });

  if (updated.count === 0) {
    return {
      ok: false,
      error: "Запит не знайдено або ви не можете його змінити.",
    };
  }

  return { ok: true };
}

export async function getSentContactRequests(
  senderId: string,
): Promise<ContactRequestListItem[]> {
  const rows = await prisma.contactRequest.findMany({
    where: { senderId },
    include: listInclude,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapContactRequest);
}

export async function getIncomingContactRequests(
  recipientId: string,
): Promise<ContactRequestListItem[]> {
  const rows = await prisma.contactRequest.findMany({
    where: { recipientId },
    include: listInclude,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapContactRequest);
}

export async function getAllContactRequests(): Promise<ContactRequestListItem[]> {
  const rows = await prisma.contactRequest.findMany({
    include: listInclude,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapContactRequest);
}
