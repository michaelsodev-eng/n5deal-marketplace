export type BuyerProfileFormValues = {
  companyName: string;
  description: string;
  investmentTypes: string[];
  industries: string[];
  countries: string[];
  minInvestment: string;
  maxInvestment: string;
  acquisitionInterests: string;
};

export type ParsedBuyerProfileInput = {
  companyName: string;
  description: string | null;
  investmentTypes: string[];
  industries: string[];
  countries: string[];
  minInvestment: number | null;
  maxInvestment: number | null;
  acquisitionInterests: string | null;
};

export type BuyerProfileFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Partial<Record<keyof BuyerProfileFormValues, string>>;
};

export const investmentTypeOptions = [
  { value: "Majority Acquisition", label: "Majority Acquisition" },
  { value: "Full Acquisition", label: "Full Acquisition" },
  { value: "Growth Investment", label: "Growth Investment" },
  { value: "Strategic Investment", label: "Strategic Investment" },
  { value: "Minority Investment", label: "Minority Investment" },
];

export const buyerIndustryOptions = [
  { value: "SaaS", label: "SaaS" },
  { value: "Fintech", label: "Fintech" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Logistics", label: "Logistics" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Technology", label: "Technology" },
  { value: "Energy", label: "Energy" },
  { value: "Food", label: "Food" },
];

export const buyerCountryOptions = [
  { value: "Germany", label: "Germany" },
  { value: "Poland", label: "Poland" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Austria", label: "Austria" },
  { value: "France", label: "France" },
  { value: "Spain", label: "Spain" },
  { value: "Sweden", label: "Sweden" },
];

function readString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function readList(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function parseOptionalAmount(
  value: string,
): { ok: true; value: number | null } | { ok: false } {
  if (!value) {
    return { ok: true, value: null };
  }

  const parsed = Number(value.replace(",", "."));

  if (!Number.isFinite(parsed) || parsed < 0) {
    return { ok: false };
  }

  return { ok: true, value: parsed };
}

export function parseBuyerProfileForm(
  formData: FormData,
):
  | { ok: true; data: ParsedBuyerProfileInput }
  | { ok: false; state: BuyerProfileFormState } {
  const companyName = readString(formData, "companyName");
  const description = readString(formData, "description");
  const acquisitionInterests = readString(formData, "acquisitionInterests");
  const minInvestmentRaw = readString(formData, "minInvestment");
  const maxInvestmentRaw = readString(formData, "maxInvestment");
  const investmentTypes = readList(formData, "investmentTypes");
  const industries = readList(formData, "industries");
  const countries = readList(formData, "countries");

  const fieldErrors: NonNullable<BuyerProfileFormState["fieldErrors"]> = {};

  if (!companyName) {
    fieldErrors.companyName = "Введіть назву компанії.";
  } else if (companyName.length > 200) {
    fieldErrors.companyName = "Назва компанії занадто довга.";
  }

  if (description.length > 5000) {
    fieldErrors.description = "Опис занадто довгий.";
  }

  if (acquisitionInterests.length > 5000) {
    fieldErrors.acquisitionInterests = "Текст занадто довгий.";
  }

  const minInvestment = parseOptionalAmount(minInvestmentRaw);
  if (!minInvestment.ok) {
    fieldErrors.minInvestment = "Введіть коректну мінімальну суму інвестицій.";
  }

  const maxInvestment = parseOptionalAmount(maxInvestmentRaw);
  if (!maxInvestment.ok) {
    fieldErrors.maxInvestment = "Введіть коректну максимальну суму інвестицій.";
  }

  if (
    minInvestment.ok &&
    maxInvestment.ok &&
    minInvestment.value != null &&
    maxInvestment.value != null &&
    minInvestment.value > maxInvestment.value
  ) {
    fieldErrors.minInvestment =
      "Мінімальна сума не може бути більшою за максимальну.";
    fieldErrors.maxInvestment =
      "Максимальна сума не може бути меншою за мінімальну.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: {
        error: "Перевірте обов’язкові поля та діапазон інвестицій.",
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    data: {
      companyName,
      description: description || null,
      investmentTypes,
      industries,
      countries,
      minInvestment: minInvestment.ok ? minInvestment.value : null,
      maxInvestment: maxInvestment.ok ? maxInvestment.value : null,
      acquisitionInterests: acquisitionInterests || null,
    },
  };
}
