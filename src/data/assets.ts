import type { MarketplaceAsset } from "@/lib/marketplace";

export type AssetStatus = MarketplaceAsset["status"];
export type MockAsset = MarketplaceAsset;

export const mockAssets: MockAsset[] = [
  {
    id: "saas-platform",
    title: "B2B-платформа управління підписками",
    description:
      "Європейський SaaS із щорічним контрактним доходом і клієнтами у виробництві, логістиці та професійних послугах.",
    assetType: "Бізнес",
    industry: "SaaS",
    country: "Німеччина",
    askingPrice: 2500000,
    revenue: 4200000,
    ebitda: 1100000,
    employees: 32,
    foundedYear: 2014,
    listedAt: "2026-07-12",
    status: "PUBLISHED",
  },
  {
    id: "fintech-payments",
    title: "Платіжний сервіс для малого бізнесу",
    description:
      "Фінтех-продукт для приймання платежів і звірки рахунків із зростаючою базою транзакцій у DACH-регіоні.",
    assetType: "Бізнес",
    industry: "Фінтех",
    country: "Австрія",
    askingPrice: 4100000,
    revenue: 6100000,
    ebitda: 980000,
    employees: 47,
    foundedYear: 2017,
    listedAt: "2026-07-28",
    status: "PUBLISHED",
  },
  {
    id: "ecommerce-brand",
    title: "D2C-бренд товарів для дому",
    description:
      "Онлайн-бренд із власним каталогом, повторюваними замовленнями та налагодженою європейською логістикою.",
    assetType: "Компанія",
    industry: "E-commerce",
    country: "Нідерланди",
    askingPrice: 1750000,
    revenue: 3600000,
    ebitda: 540000,
    employees: 21,
    foundedYear: 2016,
    listedAt: "2026-06-18",
    status: "PUBLISHED",
  },
  {
    id: "logistics-operator",
    title: "Регіональний логістичний оператор",
    description:
      "Контрактна логістика з довгостроковими B2B-клієнтами, складами та власним автопарком у Центральній Європі.",
    assetType: "Бізнес",
    industry: "Логістика",
    country: "Польща",
    askingPrice: 3350000,
    revenue: 8200000,
    ebitda: 1680000,
    employees: 86,
    foundedYear: 2009,
    listedAt: "2026-08-02",
    status: "PUBLISHED",
  },
  {
    id: "healthcare-group",
    title: "Мережа приватних клінік",
    description:
      "Група амбулаторних медичних центрів зі стабільним потоком пацієнтів і кількома міськими локаціями.",
    assetType: "Компанія",
    industry: "Охорона здоров'я",
    country: "Чехія",
    askingPrice: 4600000,
    revenue: 9400000,
    ebitda: 2050000,
    employees: 112,
    foundedYear: 2006,
    listedAt: "2026-05-30",
    status: "PUBLISHED",
  },
  {
    id: "manufacturing-business",
    title: "Виробник промислових комплектуючих",
    description:
      "Прибуткове виробництво з експортними контрактами, сертифікованими процесами та сформованою командою інженерів.",
    assetType: "Бізнес",
    industry: "Виробництво",
    country: "Чехія",
    askingPrice: 5800000,
    revenue: 13100000,
    ebitda: 2480000,
    employees: 154,
    foundedYear: 1998,
    listedAt: "2026-06-09",
    status: "PUBLISHED",
  },
  {
    id: "renewable-energy",
    title: "Підрядник комерційної сонячної генерації",
    description:
      "Інжинірингова компанія з портфелем встановлених потужностей і сервісними контрактами для бізнес-клієнтів.",
    assetType: "Інвестиційний актив",
    industry: "Енергетика",
    country: "Іспанія",
    askingPrice: 7200000,
    revenue: 11800000,
    ebitda: 2310000,
    employees: 69,
    foundedYear: 2011,
    listedAt: "2026-08-08",
    status: "PUBLISHED",
  },
  {
    id: "food-manufacturer",
    title: "Виробник private-label харчових продуктів",
    description:
      "Харчове підприємство з потужностями для рітейлу та стабільними замовленнями від європейських мереж.",
    assetType: "Компанія",
    industry: "Харчова промисловість",
    country: "Франція",
    askingPrice: 3050000,
    revenue: 6900000,
    ebitda: 1240000,
    employees: 91,
    foundedYear: 2003,
    listedAt: "2026-04-21",
    status: "PUBLISHED",
  },
  {
    id: "cybersecurity-studio",
    title: "Студія кібербезпеки та compliance",
    description:
      "Команда з аудиту, моніторингу та впровадження безпеки для фінансових і технологічних клієнтів.",
    assetType: "Компанія",
    industry: "Кібербезпека",
    country: "Україна",
    askingPrice: 1900000,
    revenue: 2800000,
    ebitda: 720000,
    employees: 38,
    foundedYear: 2015,
    listedAt: "2026-07-04",
    status: "PUBLISHED",
  },
  {
    id: "industrial-automation",
    title: "Інтегратор промислової автоматизації",
    description:
      "Постачальник рішень для виробничих ліній із проєктною моделлю доходу та довгими циклами впровадження.",
    assetType: "Інвестиційний актив",
    industry: "Автоматизація",
    country: "Швеція",
    askingPrice: 8450000,
    revenue: 15200000,
    ebitda: 2760000,
    employees: 128,
    foundedYear: null,
    listedAt: "2026-08-14",
    status: "PUBLISHED",
  },
];

export const featuredAssetIds = [
  "saas-platform",
  "fintech-payments",
  "logistics-operator",
  "renewable-energy",
];

export function getPublishedAssets(): MockAsset[] {
  return mockAssets.filter((asset) => asset.status === "PUBLISHED");
}

export function getFeaturedAssets(): MockAsset[] {
  return featuredAssetIds
    .map((id) => mockAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MockAsset => Boolean(asset));
}
