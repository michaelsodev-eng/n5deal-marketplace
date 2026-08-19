export type AssetStatus = "DRAFT" | "PUBLISHED" | "SUSPENDED";

export type MockAsset = {
  id: string;
  title: string;
  description: string;
  assetType: string;
  industry: string;
  country: string;
  askingPrice: number;
  revenue: number | null;
  ebitda: number | null;
  employees: number | null;
  status: AssetStatus;
};

export const mockAssets: MockAsset[] = [
  {
    id: "saas-platform",
    title: "B2B SaaS-платформа",
    description:
      "Зріла B2B SaaS-компанія з регулярним доходом і міжнародною клієнтською базою в Європі.",
    assetType: "Бізнес",
    industry: "SaaS",
    country: "Німеччина",
    askingPrice: 2500000,
    revenue: 4200000,
    ebitda: 1100000,
    employees: 32,
    status: "PUBLISHED",
  },
  {
    id: "fintech-payments",
    title: "Фінтех-платіжна платформа",
    description:
      "Платіжний сервіс для малого та середнього бізнесу з зростаючою транзакційною базою.",
    assetType: "Бізнес",
    industry: "Фінтех",
    country: "Німеччина",
    askingPrice: 3800000,
    revenue: 5600000,
    ebitda: 900000,
    employees: 45,
    status: "PUBLISHED",
  },
  {
    id: "ecommerce-brand",
    title: "E-commerce бренд",
    description:
      "Європейський бренд прямих продажів із власною логістикою та повторюваними замовленнями.",
    assetType: "Компанія",
    industry: "E-commerce",
    country: "Нідерланди",
    askingPrice: 1800000,
    revenue: 3900000,
    ebitda: 650000,
    employees: 18,
    status: "PUBLISHED",
  },
  {
    id: "logistics-operator",
    title: "Логістичний оператор",
    description:
      "Регіональний логістичний бізнес із довгостроковими B2B-контрактами та власним автопарком.",
    assetType: "Бізнес",
    industry: "Логістика",
    country: "Польща",
    askingPrice: 3200000,
    revenue: 7800000,
    ebitda: 1600000,
    employees: 74,
    status: "PUBLISHED",
  },
  {
    id: "healthcare-group",
    title: "Група медичних послуг",
    description:
      "Приватна мережа медичних послуг із кількома локаціями та стабільним потоком пацієнтів.",
    assetType: "Компанія",
    industry: "Охорона здоров'я",
    country: "Польща",
    askingPrice: 4200000,
    revenue: 9100000,
    ebitda: 1900000,
    employees: 96,
    status: "PUBLISHED",
  },
  {
    id: "manufacturing-business",
    title: "Виробничий бізнес",
    description:
      "Прибуткове виробництво з промисловою клієнтською базою та налагодженим експортом.",
    assetType: "Бізнес",
    industry: "Виробництво",
    country: "Чехія",
    askingPrice: 5200000,
    revenue: 12400000,
    ebitda: 2400000,
    employees: 140,
    status: "PUBLISHED",
  },
  {
    id: "renewable-energy",
    title: "Бізнес відновлюваної енергетики",
    description:
      "Компанія комерційних енергетичних інсталяцій із портфелем довгострокових проєктів.",
    assetType: "Бізнес",
    industry: "Енергетика",
    country: "Нідерланди",
    askingPrice: 6500000,
    revenue: 11200000,
    ebitda: 2200000,
    employees: 64,
    status: "PUBLISHED",
  },
  {
    id: "food-manufacturer",
    title: "Харчове виробництво",
    description:
      "Виробник продуктів харчування з приватними торговими марками та стабільними замовленнями.",
    assetType: "Компанія",
    industry: "Харчова промисловість",
    country: "Чехія",
    askingPrice: 2900000,
    revenue: 6700000,
    ebitda: 1200000,
    employees: 82,
    status: "PUBLISHED",
  },
];

export const featuredAssetIds = [
  "saas-platform",
  "fintech-payments",
  "logistics-operator",
  "renewable-energy",
];

export const assetCategories = ["Усі", "Бізнес", "Компанія"] as const;

export function getPublishedAssets(): MockAsset[] {
  return mockAssets.filter((asset) => asset.status === "PUBLISHED");
}

export function getFeaturedAssets(): MockAsset[] {
  return featuredAssetIds
    .map((id) => mockAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MockAsset => Boolean(asset));
}

export function uniqueValues(
  assets: MockAsset[],
  key: "country" | "industry" | "assetType",
): string[] {
  return [...new Set(assets.map((asset) => asset[key]))].sort((a, b) =>
    a.localeCompare(b, "uk"),
  );
}
