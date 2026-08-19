import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireManagerUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  return user;
}

export async function setManagedUserStatus(input: {
  actorId: string;
  userId: string;
  status: "ACTIVE" | "SUSPENDED";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (input.actorId === input.userId) {
    return { ok: false, error: "Ви не можете змінити статус власного акаунта." };
  }

  const existing = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { id: true },
  });

  if (!existing) {
    return { ok: false, error: "Користувача не знайдено." };
  }

  await prisma.user.update({
    where: { id: input.userId },
    data: { status: input.status },
  });

  if (input.status === "SUSPENDED") {
    await prisma.session.deleteMany({
      where: { userId: input.userId },
    });
  }

  return { ok: true };
}

export async function removeManagedUser(input: {
  actorId: string;
  userId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (input.actorId === input.userId) {
    return { ok: false, error: "Ви не можете видалити власний акаунт." };
  }

  const existing = await prisma.user.findUnique({
    where: { id: input.userId },
    select: { id: true },
  });

  if (!existing) {
    return { ok: false, error: "Користувача не знайдено." };
  }

  await prisma.user.delete({
    where: { id: input.userId },
  });

  return { ok: true };
}

export async function setManagedAssetStatus(input: {
  assetId: string;
  status: "PUBLISHED" | "SUSPENDED";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const updated = await prisma.asset.updateMany({
    where: { id: input.assetId },
    data: { status: input.status },
  });

  if (updated.count === 0) {
    return { ok: false, error: "Актив не знайдено." };
  }

  return { ok: true };
}
