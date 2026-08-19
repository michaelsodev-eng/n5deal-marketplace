import { getCountryMark } from "@/data/countries";
import { cn } from "@/lib/cn";

type CountryMarkProps = {
  country: string;
  className?: string;
};

export function CountryMark({ country, className }: CountryMarkProps) {
  const mark = getCountryMark(country);

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex h-6 min-w-8 items-center justify-center rounded-md px-1.5 text-[10px] font-semibold tracking-wide text-white",
          mark.className,
        )}
      >
        {mark.code}
      </span>
      <span className="text-sm text-muted">{country}</span>
    </span>
  );
}
