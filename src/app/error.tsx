"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,#eef3fb_0%,#f6f8fb_100%)] py-16 sm:py-24">
      <Container size="narrow">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            N5Deal Marketplace
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Щось пішло не так
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Не вдалося завантажити сторінку. Спробуйте ще раз або поверніться на
            головну.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button type="button" onClick={() => reset()}>
              Спробувати знову
            </Button>
            <Button href="/" variant="outline">
              На головну
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
