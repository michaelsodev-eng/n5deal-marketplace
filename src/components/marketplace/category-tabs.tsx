import { cn } from "@/lib/cn";

type CategoryTabsProps = {
  categories: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryTabs({ categories, value, onChange }: CategoryTabsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2" role="tablist" aria-label="Категорії">
        {categories.map((category) => {
          const selected = value === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(category)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-muted hover:border-primary/30 hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
