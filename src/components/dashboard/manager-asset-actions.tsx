"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { updateManagedAssetStatusAction } from "@/app/manager/actions";

type ManagerAssetActionsProps = {
  assetId: string;
  status: "DRAFT" | "PUBLISHED" | "SUSPENDED";
};

export function ManagerAssetActions({ assetId, status }: ManagerAssetActionsProps) {
  const action = updateManagedAssetStatusAction.bind(null, assetId);
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div className="space-y-2">
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
        {status !== "PUBLISHED" ? (
          <Button
            type="submit"
            name="intent"
            value="publish"
            size="sm"
            disabled={pending}
          >
            {pending ? "Збереження..." : "Опублікувати"}
          </Button>
        ) : null}
        {status !== "SUSPENDED" ? (
          <Button
            type="submit"
            name="intent"
            value="suspend"
            size="sm"
            variant="outline"
            disabled={pending}
          >
            {pending ? "Збереження..." : "Призупинити"}
          </Button>
        ) : null}
      </form>
      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
