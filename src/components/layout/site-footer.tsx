import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
  { href: "/assets", label: "Marketplace" },
  { href: "/buyers", label: "Покупці" },
  { href: "/sellers", label: "Продавці" },
  { href: "/resources", label: "Ресурси" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container
        size="wide"
        className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-foreground">N5Deal Marketplace</p>
          <p className="mt-1 text-sm text-muted">
            Майданчик для купівлі та продажу бізнесу й активів.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container size="wide" className="py-4">
          <p className="text-xs text-muted">© 2026 N5Deal Marketplace</p>
        </Container>
      </div>
    </footer>
  );
}
