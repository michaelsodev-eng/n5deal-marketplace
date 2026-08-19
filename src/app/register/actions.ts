"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { getPostLoginPath } from "@/lib/login";
import { parseRegisterForm, type RegisterFormState } from "@/lib/register-form";
import { registerUser } from "@/lib/register";

export type { RegisterFormState };

export async function registerAction(
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const parsed = parseRegisterForm(formData);

  if (!parsed.ok) {
    return parsed.state;
  }

  try {
    const result = await registerUser(parsed.data);

    if (!result.ok) {
      return { error: result.error };
    }

    await createSession(result.userId);
  } catch (error) {
    console.error("Register user failed", error);
    return { error: "Не вдалося створити акаунт. Спробуйте пізніше." };
  }

  redirect(getPostLoginPath(parsed.data.role));
}
