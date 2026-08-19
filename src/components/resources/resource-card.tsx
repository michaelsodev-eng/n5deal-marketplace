import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { MarketplaceResource, ResourceCategory } from "@/lib/resources";

const visualStyles: Record<
  ResourceCategory,
  { wrap: string; mark: string; label: string }
> = {
  "Market Insights": {
    wrap: "bg-[linear-gradient(135deg,#d7e4fb_0%,#eef3fb_100%)]",
    mark: "bg-primary text-white",
    label: "Огляд",
  },
  Articles: {
    wrap: "bg-[linear-gradient(135deg,#e8eef8_0%,#f6f8fb_100%)]",
    mark: "bg-[#0b2240] text-white",
    label: "Аналітика",
  },
  Guides: {
    wrap: "bg-[linear-gradient(135deg,#e6f4f1_0%,#f3faf8_100%)]",
    mark: "bg-success text-white",
    label: "Гід",
  },
  "Due Diligence": {
    wrap: "bg-[linear-gradient(135deg,#fef3e8_0%,#fff8f1_100%)]",
    mark: "bg-warning text-white",
    label: "Перевірка",
  },
  Glossary: {
    wrap: "bg-[linear-gradient(135deg,#ece4f8_0%,#f7f4fb_100%)]",
    mark: "bg-[#5b21b6] text-white",
    label: "Терміни",
  },
};

function ResourceVisual({
  category,
  featured,
}: {
  category: ResourceCategory;
  featured: boolean;
}) {
  const visual = visualStyles[category];

  return (
    <div
        className={cn("relative h-40 overflow-hidden", visual.wrap)}
    >
      <div className="absolute -top-8 -right-6 h-28 w-28 rounded-full bg-white/40" />
      <div className="absolute top-10 right-10 h-16 w-16 rounded-2xl bg-white/50" />
      <div className="absolute bottom-0 left-0 h-16 w-full bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
      <div className="absolute inset-0 flex items-end justify-between p-4">
        <span
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-[11px] font-semibold tracking-wide uppercase",
            visual.mark,
          )}
        >
          {visual.label}
        </span>
        {featured ? (
          <Badge variant="default" className="bg-white text-primary">
            Рекомендовано
          </Badge>
        ) : null}
      </div>
    </div>
  );
}

type ResourceCardProps = {
  resource: MarketplaceResource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_8px_28px_rgba(15,34,64,0.08)]">
      <ResourceVisual category={resource.category} featured={resource.featured} />
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="neutral">{resource.category}</Badge>
        <h2 className="mt-3 text-lg font-semibold tracking-tight break-words text-foreground">
          {resource.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
          {resource.excerpt}
        </p>
        {resource.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-xs text-muted">
          {formatDate(resource.publishedAt)} · {resource.readingMinutes} хв читання
        </p>
        <div className="mt-5 sm:mt-auto">
          <Button type="button" variant="outline" className="w-full">
            Читати далі
          </Button>
        </div>
      </div>
    </Card>
  );
}
