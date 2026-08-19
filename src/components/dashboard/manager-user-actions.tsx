"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { updateManagedUserStatusAction } from "@/app/manager/actions";

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
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
