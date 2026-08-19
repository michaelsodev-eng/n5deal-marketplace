import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
};

export function Select({
  label,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block w-full" htmlFor={selectId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </span>
      ) : null}
      <select
        id={selectId}
        className={cn(
          "h-11 w-full min-w-0 cursor-pointer appearance-none rounded-lg border border-border bg-surface bg-[length:16px] bg-[right_12px_center] bg-no-repeat px-3 pr-10 text-sm text-foreground shadow-sm outline-none transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%235b6b82' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
