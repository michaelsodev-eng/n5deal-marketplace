import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="py-16 sm:py-24" aria-busy="true" aria-live="polite">
      <Container size="narrow">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium tracking-wide text-primary">
            N5Deal Marketplace
          </p>
          <p className="mt-3 text-base text-muted">Завантаження...</p>
        </div>
      </Container>
    </section>
  );
}
