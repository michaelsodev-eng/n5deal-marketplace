"use client";

import { useActionState } from "react";
import { updateManagedUserStatusAction } from "@/app/manager/actions";
import { Button } from "@/components/ui/button";

type ManagerUserActionsProps = {
  userId: string;
  status: "ACTIVE" | "SUSPENDED";
};

export function ManagerUserActions({ userId, status }: ManagerUserActionsProps) {
  const action = updateManagedUserStatusAction.bind(null, userId);
  const [state, formAction, pending] = useActionState(action, {});
  const nextIntent = status === "ACTIVE" ? "suspend" : "activate";

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <form action={formAction}>
          <Button
            type="submit"
            name="intent"
            value={nextIntent}
            size="sm"
            variant={nextIntent === "activate" ? "primary" : "outline"}
            disabled={pending}
          >
            {pending
              ? "Збереження..."
              : nextIntent === "activate"
                ? "Активувати"
                : "Призупинити"}
          </Button>
        </form>
        <form
          action={formAction}
          onSubmit={(event) => {
            if (
              !window.confirm(
                "Видалити цього користувача разом із профілем, активами та запитами?",
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <Button
            type="submit"
            name="intent"
            value="remove"
            size="sm"
            variant="outline"
            disabled={pending}
          >
            {pending ? "Видалення..." : "Видалити"}
          </Button>
        </form>
      </div>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
