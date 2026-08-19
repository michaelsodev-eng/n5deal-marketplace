"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutCurrentUser } from "@/lib/login";

type LogoutButtonProps = {
  variant?: "outline" | "ghost";
  className?: string;
};

export function LogoutButton({
  variant = "outline",
  className,
}: LogoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await logoutCurrentUser();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={handleLogout}
      disabled={pending}
    >
      {pending ? "Вихід..." : "Вийти"}
    </Button>
  );
}
