"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  buildManagerHref,
  defaultManagerFilters,
  managerAssetStatusOptions,
  managerRoleOptions,
  managerUserStatusOptions,
  type ManagerFilterState,
} from "@/lib/manager-filters";

type ManagerFiltersProps = {
  filters: ManagerFilterState;
};

export function ManagerFilters({ filters }: ManagerFiltersProps) {
  const router = useRouter();

  function navigate(patch: Partial<ManagerFilterState>) {
    router.push(buildManagerHref({ ...filters, ...patch }));
  }

  return (
    <div className="mt-8 space-y-4">
      <form
        className="grid gap-3 rounded-xl border border-border bg-surface p-4 shadow-card md:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          navigate({
            userQ: String(formData.get("userQ") ?? "").trim(),
          });
        }}
      >
        <Input
          key={filters.userQ}
          name="userQ"
          type="search"
          label="Пошук користувачів"
          defaultValue={filters.userQ}
          placeholder="Email або компанія"
          aria-label="Пошук користувачів"
          className="h-10"
        />
        <Select
          label="Роль"
          name="role"
          value={filters.role}
          options={managerRoleOptions}
          className="h-10"
          onChange={(event) => navigate({ role: event.target.value })}
        />
        <Select
          label="Статус користувача"
          name="userStatus"
          value={filters.userStatus}
          options={managerUserStatusOptions}
          className="h-10"
          onChange={(event) => navigate({ userStatus: event.target.value })}
        />
        <div className="flex items-end">
          <Button type="submit" className="w-full md:w-auto">
            Шукати
          </Button>
        </div>
      </form>

      <form
        className="grid gap-3 rounded-xl border border-border bg-surface p-4 shadow-card md:grid-cols-[minmax(0,1fr)_180px_auto_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          navigate({
            assetQ: String(formData.get("assetQ") ?? "").trim(),
          });
        }}
      >
        <Input
          key={filters.assetQ}
          name="assetQ"
          type="search"
          label="Пошук активів"
          defaultValue={filters.assetQ}
          placeholder="Назва, продавець або email"
          aria-label="Пошук активів"
          className="h-10"
        />
        <Select
          label="Статус активу"
          name="assetStatus"
          value={filters.assetStatus}
          options={managerAssetStatusOptions}
          className="h-10"
          onChange={(event) => navigate({ assetStatus: event.target.value })}
        />
        <div className="flex items-end">
          <Button type="submit" className="w-full md:w-auto">
            Шукати
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => navigate(defaultManagerFilters)}
          >
            Очистити
          </Button>
        </div>
      </form>
    </div>
  );
}
