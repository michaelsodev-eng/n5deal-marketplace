export type RegisterRole = "BUYER" | "SELLER";

export type RegisterFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<"role" | "email" | "password" | "companyName", string>
  >;
};

export type ParsedRegisterInput = {
  role: RegisterRole;
  email: string;
  password: string;
  companyName: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRegisterForm(
  formData: FormData,
):
  | { ok: true; data: ParsedRegisterInput }
  | { ok: false; state: RegisterFormState } {
  const roleRaw = String(formData.get("role") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const companyName = String(formData.get("companyName") ?? "").trim();
  const fieldErrors: NonNullable<RegisterFormState["fieldErrors"]> = {};

  if (roleRaw !== "BUYER" && roleRaw !== "SELLER") {
    fieldErrors.role = "Оберіть статус: покупець або продавець.";
  }

  if (!email) {
    fieldErrors.email = "Введіть email.";
  } else if (!emailPattern.test(email)) {
    fieldErrors.email = "Введіть коректний email.";
  } else if (email.length > 190) {
    fieldErrors.email = "Email занадто довгий.";
  }

  if (!password) {
    fieldErrors.password = "Введіть пароль.";
  } else if (password.length < 8) {
    fieldErrors.password = "Пароль має містити щонайменше 8 символів.";
  } else if (password.length > 72) {
    fieldErrors.password = "Пароль занадто довгий.";
  }

  if (!companyName) {
    fieldErrors.companyName = "Введіть назву компанії.";
  } else if (companyName.length > 200) {
    fieldErrors.companyName = "Назва компанії занадто довга.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: {
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    data: {
      role: roleRaw as RegisterRole,
      email,
      password,
      companyName,
    },
  };
}
