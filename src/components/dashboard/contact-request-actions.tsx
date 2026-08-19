"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { respondToContactRequestAction } from "@/app/contacts/actions";
import { cn } from "@/lib/cn";

type ContactRequestActionsProps = {
  requestId: string;
};

export function ContactRequestActions({ requestId }: ContactRequestActionsProps) {
  const action = respondToContactRequestAction.bind(null, requestId);
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div className="space-y-2">
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="submit"
          name="intent"
          value="accept"
          size="sm"
          disabled={pending}
        >
          {pending ? "Збереження..." : "Прийняти"}
        </Button>
        <Button
          type="submit"
          name="intent"
          value="reject"
          variant="outline"
          size="sm"
          disabled={pending}
        >
          {pending ? "Збереження..." : "Відхилити"}
        </Button>
      </form>
      {state.error ? (
        <p
          role="alert"
          className={cn("text-sm text-red-600")}
        >
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
