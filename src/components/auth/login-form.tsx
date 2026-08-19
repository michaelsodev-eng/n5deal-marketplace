"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPostLoginPath, loginWithCredentials } from "@/lib/login";
import { cn } from "@/lib/cn";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
  password?: string;
};

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email) {
    errors.email = "Введіть email.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Введіть коректний email.";
  }

  if (!password) {
    errors.password = "Введіть пароль.";
  }

  return errors;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(email.trim(), password);
    setFieldErrors(nextErrors);
    setFormError("");

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setPending(true);

    const result = await loginWithCredentials(email.trim(), password);

    if (!result.ok) {
      setFormError(result.error);
      setPending(false);
      return;
    }

    router.push(getPostLoginPath(result.user.role));
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          aria-invalid={Boolean(fieldErrors.email)}
          className={fieldErrors.email ? "border-red-400 focus:border-red-400" : undefined}
        />
        {fieldErrors.email ? (
          <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <Input
          label="Пароль"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Введіть пароль"
          aria-invalid={Boolean(fieldErrors.password)}
          className={fieldErrors.password ? "border-red-400 focus:border-red-400" : undefined}
          action={
            <button
              type="button"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-slate-50 hover:text-foreground"
              aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l16 16M10.5 10.7A3 3 0 0 0 13.3 13.5M9.9 5.5A10.7 10.7 0 0 1 12 5.3c5 0 9 3.6 10 6.7-.4 1.2-1.2 2.5-2.3 3.6M6.1 6.7C4.4 7.9 3.1 9.5 2 12c1 3.1 5 6.7 10 6.7 1.2 0 2.4-.2 3.5-.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              )}
            </button>
          }
        />
        {fieldErrors.password ? (
          <p className="mt-1.5 text-sm text-red-600">{fieldErrors.password}</p>
        ) : null}
      </div>

      {formError ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
        >
          {formError}
        </div>
      ) : null}

      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Вхід..." : "Увійти"}
      </Button>

      <p
        className={cn(
          "rounded-lg border border-border bg-slate-50 px-3 py-3 text-sm leading-6 text-muted",
        )}
      >
        Демо-акаунт:{" "}
        <span className="font-medium text-foreground">buyer@n5deal.demo</span>
        {" / "}
        <span className="font-medium text-foreground">Demo12345!</span>
      </p>
    </form>
  );
}
