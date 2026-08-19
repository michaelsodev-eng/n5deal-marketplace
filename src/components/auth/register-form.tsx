"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/app/register/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { RegisterRole } from "@/lib/register-form";

const roles: Array<{
  value: RegisterRole;
  title: string;
  description: string;
}> = [
  {
    value: "BUYER",
    title: "Покупець",
    description: "Шукаю бізнес або інвестиційні активи",
  },
  {
    value: "SELLER",
    title: "Продавець",
    description: "Продаю бізнес або активи",
  },
];

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, {});
  const [role, setRole] = useState<RegisterRole | "">("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-8 space-y-4" action={formAction} noValidate>
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-foreground">
          Статус
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {roles.map((option) => {
            const selected = role === option.value;

            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-xl border p-4 transition-colors",
                  selected
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface hover:bg-slate-50",
                  pending ? "pointer-events-none opacity-60" : "",
                )}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={selected}
                  onChange={() => setRole(option.value)}
                  disabled={pending}
                  className="sr-only"
                />
                <span className="block text-sm font-semibold text-foreground">
                  {option.title}
                </span>
                <span className="mt-1 block text-sm leading-5 text-muted">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
        {state.fieldErrors?.role ? (
          <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.role}</p>
        ) : null}
      </fieldset>

      <div>
        <Input
          label="Назва компанії"
          name="companyName"
          autoComplete="organization"
          placeholder="Назва вашої компанії"
          disabled={pending}
          aria-invalid={Boolean(state.fieldErrors?.companyName)}
          className={
            state.fieldErrors?.companyName
              ? "border-red-400 focus:border-red-400"
              : undefined
          }
        />
        {state.fieldErrors?.companyName ? (
          <p className="mt-1.5 text-sm text-red-600">
            {state.fieldErrors.companyName}
          </p>
        ) : null}
      </div>

      <div>
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          disabled={pending}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          className={
            state.fieldErrors?.email
              ? "border-red-400 focus:border-red-400"
              : undefined
          }
        />
        {state.fieldErrors?.email ? (
          <p className="mt-1.5 text-sm text-red-600">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <Input
          label="Пароль"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Мінімум 8 символів"
          disabled={pending}
          aria-invalid={Boolean(state.fieldErrors?.password)}
          className={
            state.fieldErrors?.password
              ? "border-red-400 focus:border-red-400"
              : undefined
          }
          action={
            <button
              type="button"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-slate-50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
              disabled={pending}
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
        {state.fieldErrors?.password ? (
          <p className="mt-1.5 text-sm text-red-600">
            {state.fieldErrors.password}
          </p>
        ) : null}
      </div>

      {state.error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
        >
          {state.error}
        </div>
      ) : null}

      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Створення акаунта..." : "Створити акаунт"}
      </Button>
    </form>
  );
}
