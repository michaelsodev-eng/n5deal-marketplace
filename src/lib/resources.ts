export const resourceCategories = [
  "Market Insights",
  "Articles",
  "Guides",
  "Due Diligence",
  "Glossary",
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export type MarketplaceResource = {
  id: string;
  category: ResourceCategory;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
};

export const resourceCategoryOptions = ["Усі", ...resourceCategories] as const;

export const marketplaceResources: MarketplaceResource[] = [
  {
    id: "mid-market-ma-2026",
    category: "Market Insights",
    title: "Європейський mid-market M&A у 2026: де зараз формується попит",
    excerpt:
      "Стратегічні покупці знову активніші за фінансових інвесторів. Найбільший інтерес — до SaaS, логістики та прибуткового виробництва з повторюваним доходом.",
    tags: ["M&A", "ринок", "Європа"],
    publishedAt: "2026-08-12",
    readingMinutes: 8,
    featured: true,
  },
  {
    id: "reading-ebitda",
    category: "Articles",
    title: "Як читати EBITDA під час першої оцінки бізнесу",
    excerpt:
      "EBITDA допомагає порівняти операційну прибутковість, але без нормалізації легко переоцінити компанію. Розбираємо add-backs, разові витрати та якість прибутку.",
    tags: ["EBITDA", "оцінка", "фінанси"],
    publishedAt: "2026-08-05",
    readingMinutes: 7,
    featured: true,
  },
  {
    id: "preparing-business-for-sale",
    category: "Guides",
    title: "Як підготувати бізнес до продажу: чекліст продавця",
    excerpt:
      "Покупці дивляться не лише на виручку. Перед публікацією варто впорядкувати фінансову звітність, клієнтську концентрацію, контракти команди та історію зростання.",
    tags: ["продаж бізнесу", "підготовка", "чеклист"],
    publishedAt: "2026-07-28",
    readingMinutes: 9,
    featured: true,
  },
  {
    id: "financial-due-diligence",
    category: "Due Diligence",
    title: "Фінансовий due diligence: що перевіряти до листа про наміри",
    excerpt:
      "Короткий маршрут перевірки: якість виручки, маржа, оборотний капітал, борг і позабалансові зобов’язання. Типові знахідки, які змінюють ціну угоди.",
    tags: ["due diligence", "ризики", "угода"],
    publishedAt: "2026-07-21",
    readingMinutes: 10,
    featured: false,
  },
  {
    id: "valuation-multiples",
    category: "Articles",
    title: "Мультиплікатори оцінки: коли EV/EBITDA працює, а коли ні",
    excerpt:
      "Мультиплікатор корисний як орієнтир, але галузь, темп зростання та якість клієнтів важливіші за середнє по ринку. Пояснюємо, як не купити «красиву» цифру.",
    tags: ["valuation", "мультиплікатори", "ціна"],
    publishedAt: "2026-07-14",
    readingMinutes: 6,
    featured: false,
  },
  {
    id: "acquisition-strategy",
    category: "Guides",
    title: "Стратегія поглинання: як покупцю обрати правильний актив",
    excerpt:
      "Стратегічне придбання має закривати продуктову, географічну або кадрову прогалину. Формулюємо інвестиційні критерії до того, як відкривати переговори.",
    tags: ["покупка бізнесу", "стратегія", "критерії"],
    publishedAt: "2026-07-07",
    readingMinutes: 8,
    featured: false,
  },
  {
    id: "investment-readiness",
    category: "Guides",
    title: "Investment readiness: коли компанія справді готова до угоди",
    excerpt:
      "Інвестори очікують прозору звітність, зрозумілу юніт-економіку та керовані ризики залежності від засновника. Ознаки, що бізнес ще рано виводити на майданчик.",
    tags: ["інвестиції", "готовність", "продаж"],
    publishedAt: "2026-06-30",
    readingMinutes: 7,
    featured: false,
  },
  {
    id: "commercial-dd-red-flags",
    category: "Due Diligence",
    title: "Комерційний due diligence: червоні прапорці для покупця",
    excerpt:
      "Концентрація клієнтів, відтік контрактів, слабка диференціація та залежність від одного каналу продажів часто важливіші за красиву EBITDA в тизері.",
    tags: ["due diligence", "клієнти", "ризики"],
    publishedAt: "2026-06-18",
    readingMinutes: 6,
    featured: false,
  },
  {
    id: "asking-price-glossary",
    category: "Glossary",
    title: "Asking price, EV та нормалізована EBITDA: короткий глосарій угоди",
    excerpt:
      "Базові терміни, без яких складно читати картку активу: ціна пропозиції, вартість підприємства, нормалізація прибутку, earn-out і working capital adjustment.",
    tags: ["глосарій", "EBITDA", "терміни"],
    publishedAt: "2026-06-09",
    readingMinutes: 5,
    featured: false,
  },
];

export function filterMarketplaceResources(
  resources: MarketplaceResource[],
  query: string,
  category: string,
): MarketplaceResource[] {
  const normalizedQuery = query.trim().toLowerCase();

  return resources
    .filter((resource) => {
      const matchesCategory =
        category === "Усі" || resource.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        resource.title,
        resource.excerpt,
        resource.category,
        ...resource.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.publishedAt.localeCompare(a.publishedAt),
    );
}
