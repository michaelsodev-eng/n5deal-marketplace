import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({
  label,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="block w-full" htmlFor={textareaId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </span>
      ) : null}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-32 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground shadow-sm outline-none placeholder:text-muted/80 transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20",
          className,
        )}
        {...props}
      />
    </label>
  );
}
