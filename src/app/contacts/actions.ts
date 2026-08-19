"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  createBuyerContactRequest,
  respondToContactRequest,
} from "@/lib/contact-requests";

export type ContactActionState = {
  error?: string;
  success?: boolean;
};

function parseMessage(formData: FormData): string | ContactActionState {
  const message = String(formData.get("message") ?? "").trim();

  if (!message) {
    return { error: "Введіть повідомлення." };
  }

  if (message.length > 2000) {
    return { error: "Повідомлення занадто довге." };
  }

  return message;
}

export async function createContactRequestAction(
  assetId: string,
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "BUYER") {
    return { error: "Лише покупці можуть надсилати запити." };
  }

  const parsed = parseMessage(formData);

  if (typeof parsed !== "string") {
    return parsed;
  }

  try {
    const result = await createBuyerContactRequest({
      buyerId: user.id,
      assetId,
      message: parsed,
    });

    if (!result.ok) {
      return { error: result.error };
    }
  } catch (error) {
    console.error("Create contact request failed", error);
    return { error: "Не вдалося надіслати запит. Спробуйте пізніше." };
  }

  revalidatePath(`/assets/${assetId}`);
  revalidatePath("/dashboard");
  revalidatePath("/manager");
  return { success: true };
}

export async function respondToContactRequestAction(
  requestId: string,
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "SELLER") {
    return { error: "Лише продавець може відповісти на запит." };
  }

  const intent = String(formData.get("intent") ?? "");
  const status =
    intent === "accept" ? "ACCEPTED" : intent === "reject" ? "DECLINED" : null;

  if (!status) {
    return { error: "Некоректна дія." };
  }

  try {
    const result = await respondToContactRequest({
      requestId,
      recipientId: user.id,
      status,
    });

    if (!result.ok) {
      return { error: result.error };
    }
  } catch (error) {
    console.error("Respond to contact request failed", error);
    return { error: "Не вдалося оновити запит. Спробуйте пізніше." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/manager");
  return { success: true };
}
