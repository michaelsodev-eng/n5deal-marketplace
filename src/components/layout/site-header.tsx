"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type HeaderSession = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  session?: HeaderSession | null;
};

const navigation = [
  { href: "/assets", label: "Marketplace" },
  { href: "/buyers", label: "Покупці" },
  { href: "/sellers", label: "Продавці" },
  { href: "/resources", label: "Ресурси" },
];

export function SiteHeader({ session = null }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const cabinetActive =
    pathname.startsWith("/dashboard") || pathname.startsWith("/manager");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <Container size="wide" className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 cursor-pointer items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-semibold tracking-tight text-white">
            N5
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
            N5Deal Marketplace
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "cursor-pointer text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <>
              <span className="max-w-[180px] truncate text-sm text-muted">
                {session.label}
              </span>
              <Button
                href={session.href}
                variant={cabinetActive ? "primary" : "outline"}
              >
                Кабінет
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Вхід
              </Button>
              <Button href="/register">Почати</Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-foreground hover:bg-slate-50 lg:hidden"
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </Container>

      {open ? (
        <div
          id="site-mobile-nav"
          className="border-t border-border bg-surface lg:hidden"
        >
          <Container size="wide" className="flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary-soft text-primary"
                    : "text-foreground hover:bg-slate-50",
                )}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <div className="mt-3 space-y-2">
                <p className="truncate px-3 text-sm text-muted">{session.label}</p>
                <Button
                  href={session.href}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Кабінет
                </Button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  href="/login"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Вхід
                </Button>
                <Button href="/register" onClick={() => setOpen(false)}>
                  Почати
                </Button>
              </div>
            )}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
