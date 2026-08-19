import Link from "next/link";
import { cn } from "@/lib/cn";

type MarketplacePaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  getPageHref: (page: number) => string;
};

function visiblePages(current: number, total: number): number[] {
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  const pages = new Set<number>([1, total]);

  for (let value = start; value <= end; value += 1) {
    pages.add(value);
  }

  return [...pages].sort((a, b) => a - b);
}

export function MarketplacePagination({
  page,
  totalPages,
  pageSize,
  total,
  getPageHref,
}: MarketplacePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = visiblePages(page, totalPages);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav
      aria-label="Пагінація"
      className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted">
        Показано {from}–{to} з {total}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        <Link
          href={getPageHref(Math.max(1, page - 1))}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : undefined}
          className={cn(
            "inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium",
            page <= 1
              ? "pointer-events-none cursor-not-allowed text-muted"
              : "cursor-pointer bg-surface text-foreground hover:bg-slate-50",
          )}
        >
          Назад
        </Link>
        {pages.map((item, index) => {
          const previous = pages[index - 1];
          const showEllipsis = previous != null && item - previous > 1;

          return (
            <span key={item} className="flex items-center gap-1.5">
              {showEllipsis ? (
                <span className="px-1 text-sm text-muted">…</span>
              ) : null}
              <Link
                href={getPageHref(item)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-medium",
                  item === page
                    ? "cursor-pointer border-primary bg-primary text-white"
                    : "cursor-pointer border-border bg-surface text-foreground hover:bg-slate-50",
                )}
              >
                {item}
              </Link>
            </span>
          );
        })}
        <Link
          href={getPageHref(Math.min(totalPages, page + 1))}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : undefined}
          className={cn(
            "inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium",
            page >= totalPages
              ? "pointer-events-none cursor-not-allowed text-muted"
              : "cursor-pointer bg-surface text-foreground hover:bg-slate-50",
          )}
        >
          Далі
        </Link>
      </div>
    </nav>
  );
}
