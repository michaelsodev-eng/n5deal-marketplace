"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createSellerContactRequestAction } from "@/app/contacts/actions";
import { cn } from "@/lib/cn";

type ContactBuyerFormProps = {
  buyerProfileId: string;
};

export function ContactBuyerForm({ buyerProfileId }: ContactBuyerFormProps) {
  const action = createSellerContactRequestAction.bind(null, buyerProfileId);
  const [state, formAction, pending] = useActionState(action, {});

  if (state.success) {
    return (
      <div
        role="status"
        className="rounded-lg border border-success/20 bg-success-soft px-3 py-2.5 text-sm text-success"
      >
        Запит надіслано покупцю.
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
          placeholder="Коротко опишіть пропозицію або інтерес до співпраці"
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
        {pending ? "Надсилання..." : "Зв’язатися з покупцем"}
      </Button>
    </form>
  );
}
