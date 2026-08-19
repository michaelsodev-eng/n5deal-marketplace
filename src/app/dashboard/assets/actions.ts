"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSellerAsset, updateSellerAsset } from "@/lib/assets";
import {
  parseAssetForm,
  parseAssetIntent,
  type AssetFormState,
} from "@/lib/asset-form";
import { requireSellerUser } from "@/lib/seller";

function statusFromIntent(formData: FormData) {
  return parseAssetIntent(formData) === "publish" ? "PUBLISHED" : "DRAFT";
}

export async function createAssetAction(
  _prevState: AssetFormState,
  formData: FormData,
): Promise<AssetFormState> {
  const seller = await requireSellerUser();
  const parsed = parseAssetForm(formData);

  if (!parsed.ok) {
    return parsed.state;
  }

  try {
    await createSellerAsset(
      seller.sellerProfile.id,
      parsed.data,
      statusFromIntent(formData),
    );
  } catch (error) {
    console.error("Create seller asset failed", error);
    return { error: "Не вдалося зберегти актив. Спробуйте пізніше." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/assets");
  redirect("/dashboard");
}

export async function updateAssetAction(
  assetId: string,
  _prevState: AssetFormState,
  formData: FormData,
): Promise<AssetFormState> {
  const seller = await requireSellerUser();
  const parsed = parseAssetForm(formData);

  if (!parsed.ok) {
    return parsed.state;
  }

  try {
    const updated = await updateSellerAsset(
      assetId,
      seller.sellerProfile.id,
      parsed.data,
      statusFromIntent(formData),
    );

    if (updated === 0) {
      return { error: "Актив не знайдено або ви не можете його редагувати." };
    }
  } catch (error) {
    console.error("Update seller asset failed", error);
    return { error: "Не вдалося оновити актив. Спробуйте пізніше." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/assets");
  revalidatePath(`/assets/${assetId}`);
  redirect("/dashboard");
}
