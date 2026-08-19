import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Вхід",
  description: "Увійдіть до N5Deal Marketplace, щоб керувати угодами та активами.",
};

export default function LoginPage() {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,#eef3fb_0%,#f6f8fb_100%)] py-12 sm:py-16">
      <Container size="narrow">
        <Card className="mx-auto max-w-md p-6 sm:p-8">
          <p className="text-sm font-medium tracking-wide text-primary">
            N5Deal Marketplace
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Вхід до кабінету
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Використовуйте корпоративний email, щоб отримати доступ до угод,
            запитів і панелі керування.
          </p>
          <LoginForm />
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
