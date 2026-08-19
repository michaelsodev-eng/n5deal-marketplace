export type LoginRole = "BUYER" | "SELLER" | "MANAGER";

export type LoginUser = {
  id: string;
  email: string;
  role: LoginRole;
};

export type LoginResult =
  | { ok: true; user: LoginUser }
  | { ok: false; error: string };

function isLoginUser(value: unknown): value is LoginUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    (user.role === "BUYER" || user.role === "SELLER" || user.role === "MANAGER")
  );
}

export function getPostLoginPath(role: LoginRole): string {
  if (role === "MANAGER") {
    return "/manager";
  }

  return "/dashboard";
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResult> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401) {
        return { ok: false, error: "Невірний email або пароль." };
      }

      return { ok: false, error: "Не вдалося увійти. Спробуйте пізніше." };
    }

    if (!data || typeof data !== "object" || !("user" in data) || !isLoginUser(data.user)) {
      return { ok: false, error: "Не вдалося увійти. Спробуйте пізніше." };
    }

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, error: "Не вдалося увійти. Спробуйте пізніше." };
  }
}

export async function logoutCurrentUser(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}
