import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Реєстрація",
  description:
    "Створіть акаунт покупця або продавця на N5Deal Marketplace.",
};

export default function RegisterPage() {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,#eef3fb_0%,#f6f8fb_100%)] py-12 sm:py-16">
      <Container size="narrow">
        <Card className="mx-auto max-w-md p-6 sm:p-8">
          <p className="text-sm font-medium tracking-wide text-primary">
            N5Deal Marketplace
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Реєстрація
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Оберіть статус і створіть акаунт, щоб почати шукати угоди або
            продавати бізнес.
          </p>
          <RegisterForm />
          <p className="mt-4 text-center text-sm text-muted">
            Вже є акаунт?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary-hover"
            >
              Увійти
            </Link>
          </p>
          <div className="mt-6 border-t border-border pt-4">
            <Button href="/assets" variant="ghost" className="w-full">
              До торговельного майданчика
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
