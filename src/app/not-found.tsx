import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,#eef3fb_0%,#f6f8fb_100%)] py-16 sm:py-24">
      <Container size="narrow">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium tracking-wide text-primary">404</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Сторінку не знайдено
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Ця адреса не існує або пропозицію вже знято з майданчика.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button href="/">На головну</Button>
            <Button href="/assets" variant="outline">
              До майданчика
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
