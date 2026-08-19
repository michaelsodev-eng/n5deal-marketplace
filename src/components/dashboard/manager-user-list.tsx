import { ManagerUserActions } from "@/components/dashboard/manager-user-actions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ManagerUserItem } from "@/lib/dashboard";

const roleLabels = {
  BUYER: "Покупець",
  SELLER: "Продавець",
  MANAGER: "Менеджер",
} as const;

const statusLabels = {
  ACTIVE: "Активний",
  SUSPENDED: "Призупинено",
} as const;

const statusVariants = {
  ACTIVE: "success",
  SUSPENDED: "warning",
} as const;

type ManagerUserListProps = {
  users: ManagerUserItem[];
  currentUserId: string;
  filtered?: boolean;
};

export function ManagerUserList({
  users,
  currentUserId,
  filtered = false,
}: ManagerUserListProps) {
  if (users.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
        <p className="text-base font-medium text-foreground">
          {filtered ? "Нічого не знайдено" : "Користувачів ще немає"}
        </p>
        <p className="mt-2 text-sm text-muted">
          {filtered
            ? "Змініть пошук або фільтри, щоб побачити інших користувачів."
            : "Коли з’являться акаунти, ви зможете керувати їхнім статусом."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4">
      {users.map((user) => (
        <Card key={user.id} className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-tight break-all text-foreground">
                {user.email}
              </p>
              {user.companyName ? (
                <p className="mt-1 text-sm break-words text-muted">{user.companyName}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">{roleLabels[user.role]}</Badge>
              <Badge variant={statusVariants[user.status]}>
                {statusLabels[user.status]}
              </Badge>
            </div>
          </div>
          {user.id !== currentUserId ? (
            <div className="mt-4 border-t border-border pt-4">
              <ManagerUserActions userId={user.id} status={user.status} />
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
