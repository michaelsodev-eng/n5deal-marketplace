import type { SearchParamsInput } from "@/lib/marketplace";

export type ManagerFilterState = {
  userQ: string;
  role: string;
  userStatus: string;
  assetQ: string;
  assetStatus: string;
};

export const defaultManagerFilters: ManagerFilterState = {
  userQ: "",
  role: "all",
  userStatus: "all",
  assetQ: "",
  assetStatus: "all",
};

export const managerRoleOptions = [
  { value: "all", label: "Усі ролі" },
  { value: "BUYER", label: "Покупець" },
  { value: "SELLER", label: "Продавець" },
  { value: "MANAGER", label: "Менеджер" },
];

export const managerUserStatusOptions = [
  { value: "all", label: "Усі статуси" },
  { value: "ACTIVE", label: "Активний" },
  { value: "SUSPENDED", label: "Призупинено" },
];

export const managerAssetStatusOptions = [
  { value: "all", label: "Усі статуси" },
  { value: "PUBLISHED", label: "Опубліковано" },
  { value: "DRAFT", label: "Чернетка" },
  { value: "SUSPENDED", label: "Призупинено" },
];

function readParam(params: SearchParamsInput, key: string): string {
  const value = params[key];

  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function allowedValue(
  value: string,
  options: Array<{ value: string }>,
  fallback: string,
) {
  return options.some((option) => option.value === value) ? value : fallback;
}

export function parseManagerSearchParams(
  params: SearchParamsInput,
): ManagerFilterState {
  return {
    userQ: readParam(params, "userQ").slice(0, 120),
    role: allowedValue(
      readParam(params, "role"),
      managerRoleOptions,
      "all",
    ),
    userStatus: allowedValue(
      readParam(params, "userStatus"),
      managerUserStatusOptions,
      "all",
    ),
    assetQ: readParam(params, "assetQ").slice(0, 120),
    assetStatus: allowedValue(
      readParam(params, "assetStatus"),
      managerAssetStatusOptions,
      "all",
    ),
  };
}

export function buildManagerHref(filters: ManagerFilterState): string {
  const params = new URLSearchParams();

  if (filters.userQ) {
    params.set("userQ", filters.userQ);
  }

  if (filters.role !== "all") {
    params.set("role", filters.role);
  }

  if (filters.userStatus !== "all") {
    params.set("userStatus", filters.userStatus);
  }

  if (filters.assetQ) {
    params.set("assetQ", filters.assetQ);
  }

  if (filters.assetStatus !== "all") {
    params.set("assetStatus", filters.assetStatus);
  }

  const query = params.toString();
  return query ? `/manager?${query}` : "/manager";
}

export function hasActiveUserFilters(filters: ManagerFilterState) {
  return (
    Boolean(filters.userQ) ||
    filters.role !== "all" ||
    filters.userStatus !== "all"
  );
}

export function hasActiveAssetFilters(filters: ManagerFilterState) {
  return Boolean(filters.assetQ) || filters.assetStatus !== "all";
}
