import Link from "next/link";
import { cn } from "@/lib/cn";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навігаційна стежка" className={cn("text-sm", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={cn("flex min-w-0 items-center gap-1.5", isLast && "flex-1")}
            >
              {index > 0 ? (
                <span aria-hidden="true" className="text-border">
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="cursor-pointer transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "min-w-0 truncate font-medium text-foreground"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
