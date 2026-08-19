"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  assetTypeOptions,
  countryOptions,
  industryOptions,
  type AssetFormState,
  type AssetFormValues,
} from "@/lib/asset-form";
import { cn } from "@/lib/cn";

type AssetFormProps = {
  action: (
    state: AssetFormState,
    formData: FormData,
  ) => Promise<AssetFormState>;
  defaults?: Partial<AssetFormValues>;
};

function mergeOptions(
  options: { value: string; label: string }[],
  current?: string,
) {
  if (!current || options.some((option) => option.value === current)) {
    return options;
  }

  return [...options, { value: current, label: current }];
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1.5 text-sm text-red-600">{message}</p>;
}

export function AssetForm({ action, defaults }: AssetFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <Card className="mt-6 p-6 sm:p-8">
      <form action={formAction} className="space-y-5" noValidate>
        <div>
          <Input
            label="Назва"
            name="title"
            defaultValue={defaults?.title}
            placeholder="Назва компанії або активу"
            disabled={pending}
            aria-invalid={Boolean(fieldErrors.title)}
            className={fieldErrors.title ? "border-red-400 focus:border-red-400" : undefined}
          />
          <FieldError message={fieldErrors.title} />
        </div>

        <div>
          <Textarea
            label="Опис"
            name="description"
            rows={6}
            defaultValue={defaults?.description}
            placeholder="Коротко опишіть бізнес, модель і позицію на ринку"
            disabled={pending}
            aria-invalid={Boolean(fieldErrors.description)}
            className={fieldErrors.description ? "border-red-400 focus:border-red-400" : undefined}
          />
          <FieldError message={fieldErrors.description} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="min-w-0">
            <Select
              label="Тип активу"
              name="assetType"
              defaultValue={defaults?.assetType ?? ""}
              options={mergeOptions(assetTypeOptions, defaults?.assetType)}
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.assetType)}
              className={fieldErrors.assetType ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.assetType} />
          </div>
          <div className="min-w-0">
            <Select
              label="Галузь"
              name="industry"
              defaultValue={defaults?.industry ?? ""}
              options={mergeOptions(industryOptions, defaults?.industry)}
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.industry)}
              className={fieldErrors.industry ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.industry} />
          </div>
          <div className="min-w-0">
            <Select
              label="Країна"
              name="country"
              defaultValue={defaults?.country ?? ""}
              options={mergeOptions(countryOptions, defaults?.country)}
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.country)}
              className={fieldErrors.country ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.country} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <Input
              label="Ціна пропозиції, €"
              name="askingPrice"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              defaultValue={defaults?.askingPrice}
              placeholder="0"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.askingPrice)}
              className={fieldErrors.askingPrice ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.askingPrice} />
          </div>
          <div className="min-w-0">
            <Input
              label="Дохід, €"
              name="revenue"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              defaultValue={defaults?.revenue}
              placeholder="Необов’язково"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.revenue)}
              className={fieldErrors.revenue ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.revenue} />
          </div>
          <div className="min-w-0">
            <Input
              label="EBITDA, €"
              name="ebitda"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              defaultValue={defaults?.ebitda}
              placeholder="Необов’язково"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.ebitda)}
              className={fieldErrors.ebitda ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.ebitda} />
          </div>
          <div className="min-w-0">
            <Input
              label="Кількість співробітників"
              name="employees"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              defaultValue={defaults?.employees}
              placeholder="Необов’язково"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.employees)}
              className={fieldErrors.employees ? "border-red-400 focus:border-red-400" : undefined}
            />
            <FieldError message={fieldErrors.employees} />
          </div>
        </div>

        {state.error ? (
          <div
            role="alert"
            className={cn(
              "rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700",
            )}
          >
            {state.error}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            name="intent"
            value="draft"
            variant="outline"
            disabled={pending}
          >
            {pending ? "Збереження..." : "Зберегти як чернетку"}
          </Button>
          <Button type="submit" name="intent" value="publish" disabled={pending}>
            {pending ? "Збереження..." : "Опублікувати"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
