import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
  variant?: "default" | "plain";
};

export function Input({
  label,
  icon,
  variant = "default",
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block w-full" htmlFor={inputId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-lg bg-surface text-sm text-foreground outline-none placeholder:text-muted/80",
            variant === "default" &&
              "border border-border shadow-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20",
            variant === "plain" && "border-0 shadow-none focus:ring-0",
            icon ? "pl-10 pr-3" : "px-3",
            className,
          )}
          {...props}
        />
      </span>
    </label>
  );
}
