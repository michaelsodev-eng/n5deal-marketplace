"use server";

import { revalidatePath } from "next/cache";
import { requireBuyerUser, updateOwnedBuyerProfile } from "@/lib/buyer";
import {
  parseBuyerProfileForm,
  type BuyerProfileFormState,
} from "@/lib/buyer-profile-form";

export async function updateBuyerProfileAction(
  _prevState: BuyerProfileFormState,
  formData: FormData,
): Promise<BuyerProfileFormState> {
  const buyer = await requireBuyerUser();
  const parsed = parseBuyerProfileForm(formData);

  if (!parsed.ok) {
    return parsed.state;
  }

  try {
    const result = await updateOwnedBuyerProfile({
      userId: buyer.id,
      data: parsed.data,
    });

    if (!result.ok) {
      return { error: result.error };
    }
  } catch (error) {
    console.error("Update buyer profile failed", error);
    return { error: "Не вдалося зберегти профіль. Спробуйте пізніше." };
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}
