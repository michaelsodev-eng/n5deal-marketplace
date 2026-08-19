"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateBuyerProfileAction } from "@/app/dashboard/profile/actions";
import {
  buyerCountryOptions,
  buyerIndustryOptions,
  investmentTypeOptions,
  type BuyerProfileFormValues,
} from "@/lib/buyer-profile-form";

type BuyerProfileFormProps = {
  defaults: BuyerProfileFormValues;
};

function mergeOptions(
  options: { value: string; label: string }[],
  selected: string[],
) {
  const extra = selected
    .filter((value) => !options.some((option) => option.value === value))
    .map((value) => ({ value, label: value }));

  return [...options, ...extra];
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1.5 text-sm text-red-600">{message}</p>;
}

function OptionGroup({
  legend,
  name,
  options,
  selected,
  disabled,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  selected: string[];
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="min-w-0">
      <legend className="mb-2 text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={selected.includes(option.value)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
            />
            <span className="min-w-0 break-words">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function BuyerProfileForm({ defaults }: BuyerProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateBuyerProfileAction, {});
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <Card className="mt-6 p-6 sm:p-8">
      <form action={formAction} className="space-y-5" noValidate>
        <div>
          <Input
            label="Назва компанії"
            name="companyName"
            defaultValue={defaults.companyName}
            placeholder="Назва компанії або фонду"
            disabled={pending}
            aria-invalid={Boolean(fieldErrors.companyName)}
            className={
              fieldErrors.companyName
                ? "border-red-400 focus:border-red-400"
                : undefined
            }
          />
          <FieldError message={fieldErrors.companyName} />
        </div>

        <div>
          <Textarea
            label="Опис"
            name="description"
            rows={5}
            defaultValue={defaults.description}
            placeholder="Коротко опишіть інвестиційний профіль"
            disabled={pending}
            aria-invalid={Boolean(fieldErrors.description)}
            className={
              fieldErrors.description
                ? "border-red-400 focus:border-red-400"
                : undefined
            }
          />
          <FieldError message={fieldErrors.description} />
        </div>

        <OptionGroup
          legend="Типи інвестицій"
          name="investmentTypes"
          options={mergeOptions(investmentTypeOptions, defaults.investmentTypes)}
          selected={defaults.investmentTypes}
          disabled={pending}
        />

        <OptionGroup
          legend="Галузі"
          name="industries"
          options={mergeOptions(buyerIndustryOptions, defaults.industries)}
          selected={defaults.industries}
          disabled={pending}
        />

        <OptionGroup
          legend="Країни"
          name="countries"
          options={mergeOptions(buyerCountryOptions, defaults.countries)}
          selected={defaults.countries}
          disabled={pending}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <Input
              label="Мінімальна інвестиція, €"
              name="minInvestment"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              defaultValue={defaults.minInvestment}
              placeholder="Необов’язково"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.minInvestment)}
              className={
                fieldErrors.minInvestment
                  ? "border-red-400 focus:border-red-400"
                  : undefined
              }
            />
            <FieldError message={fieldErrors.minInvestment} />
          </div>
          <div className="min-w-0">
            <Input
              label="Максимальна інвестиція, €"
              name="maxInvestment"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              defaultValue={defaults.maxInvestment}
              placeholder="Необов’язково"
              disabled={pending}
              aria-invalid={Boolean(fieldErrors.maxInvestment)}
              className={
                fieldErrors.maxInvestment
                  ? "border-red-400 focus:border-red-400"
                  : undefined
              }
            />
            <FieldError message={fieldErrors.maxInvestment} />
          </div>
        </div>

        <div>
          <Textarea
            label="Інтереси щодо угод"
            name="acquisitionInterests"
            rows={5}
            defaultValue={defaults.acquisitionInterests}
            placeholder="Які активи або типи угод вас цікавлять"
            disabled={pending}
            aria-invalid={Boolean(fieldErrors.acquisitionInterests)}
            className={
              fieldErrors.acquisitionInterests
                ? "border-red-400 focus:border-red-400"
                : undefined
            }
          />
          <FieldError message={fieldErrors.acquisitionInterests} />
        </div>

        {state.error ? (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
          >
            {state.error}
          </div>
        ) : null}

        {state.success ? (
          <div
            role="status"
            className="rounded-lg border border-success/20 bg-success-soft px-3 py-2.5 text-sm text-success"
          >
            Профіль збережено.
          </div>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
          <Button href="/dashboard" variant="outline">
            Назад до кабінету
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Збереження..." : "Зберегти профіль"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
