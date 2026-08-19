"use server";

import { revalidatePath } from "next/cache";
import {
  requireManagerUser,
  removeManagedUser,
  setManagedAssetStatus,
  setManagedUserStatus,
} from "@/lib/manager";

export type ManagerActionState = {
  error?: string;
  success?: boolean;
};

export async function updateManagedUserStatusAction(
  userId: string,
  _prevState: ManagerActionState,
  formData: FormData,
): Promise<ManagerActionState> {
  const manager = await requireManagerUser();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "remove") {
    try {
      const result = await removeManagedUser({
        actorId: manager.id,
        userId,
      });

      if (!result.ok) {
        return { error: result.error };
      }
    } catch (error) {
      console.error("Remove managed user failed", error);
      return { error: "Не вдалося видалити користувача. Спробуйте пізніше." };
    }

    revalidatePath("/manager");
    revalidatePath("/dashboard");
    revalidatePath("/assets");
    revalidatePath("/buyers");
    revalidatePath("/sellers");
    return { success: true };
  }

  const status =
    intent === "activate"
      ? "ACTIVE"
      : intent === "suspend"
        ? "SUSPENDED"
        : null;

  if (!status) {
    return { error: "Некоректна дія." };
  }

  try {
    const result = await setManagedUserStatus({
      actorId: manager.id,
      userId,
      status,
    });

    if (!result.ok) {
      return { error: result.error };
    }
  } catch (error) {
    console.error("Update managed user status failed", error);
    return { error: "Не вдалося оновити користувача. Спробуйте пізніше." };
  }

  revalidatePath("/manager");
  return { success: true };
}

export async function updateManagedAssetStatusAction(
  assetId: string,
  _prevState: ManagerActionState,
  formData: FormData,
): Promise<ManagerActionState> {
  await requireManagerUser();
  const intent = String(formData.get("intent") ?? "");
  const status =
    intent === "publish"
      ? "PUBLISHED"
      : intent === "suspend"
        ? "SUSPENDED"
        : null;

  if (!status) {
    return { error: "Некоректна дія." };
  }

  try {
    const result = await setManagedAssetStatus({
      assetId,
      status,
    });

    if (!result.ok) {
      return { error: result.error };
    }
  } catch (error) {
    console.error("Update managed asset status failed", error);
    return { error: "Не вдалося оновити актив. Спробуйте пізніше." };
  }

  revalidatePath("/manager");
  revalidatePath("/dashboard");
  revalidatePath("/assets");
  revalidatePath(`/assets/${assetId}`);
  return { success: true };
}
