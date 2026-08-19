"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createContactRequestAction } from "@/app/contacts/actions";
import { cn } from "@/lib/cn";

type ContactSellerFormProps = {
  assetId: string;
};

export function ContactSellerForm({ assetId }: ContactSellerFormProps) {
  const action = createContactRequestAction.bind(null, assetId);
  const [state, formAction, pending] = useActionState(action, {});

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-success/20 bg-success-soft px-3 py-2.5 text-sm text-success"
      >
        Запит надіслано продавцю.
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <div>
        <Textarea
          label="Повідомлення"
          name="message"
          rows={4}
          className="min-h-24"
          placeholder="Коротко опишіть інтерес до активу"
          disabled={pending}
          aria-invalid={Boolean(state.error)}
        />
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
      <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Надсилання..." : "Зв’язатися з продавцем"}
      </Button>
    </form>
  );
}
