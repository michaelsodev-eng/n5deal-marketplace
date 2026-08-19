export type AssetFormValues = {
  title: string;
  description: string;
  assetType: string;
  industry: string;
  country: string;
  askingPrice: string;
  revenue: string;
  ebitda: string;
  employees: string;
};

export type ParsedAssetInput = {
  title: string;
  description: string;
  assetType: string;
  industry: string;
  country: string;
  askingPrice: number;
  revenue: number | null;
  ebitda: number | null;
  employees: number | null;
};

export type AssetFormState = {
  error?: string;
  fieldErrors?: Partial<Record<keyof AssetFormValues, string>>;
};

export type AssetIntent = "draft" | "publish";

export const assetTypeOptions = [
  { value: "", label: "Оберіть тип" },
  { value: "Business", label: "Business" },
  { value: "Company", label: "Company" },
];

export const industryOptions = [
  { value: "", label: "Оберіть галузь" },
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

export const countryOptions = [
  { value: "", label: "Оберіть країну" },
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

function readString(formData: FormData, key: keyof AssetFormValues): string {
  return String(formData.get(key) ?? "").trim();
}

export function parseAssetIntent(formData: FormData): AssetIntent {
  const intent = String(formData.get("intent") ?? "");
  return intent === "publish" ? "publish" : "draft";
}

export function parseAssetForm(
  formData: FormData,
): { ok: true; data: ParsedAssetInput } | { ok: false; state: AssetFormState } {
  const values: AssetFormValues = {
    title: readString(formData, "title"),
    description: readString(formData, "description"),
    assetType: readString(formData, "assetType"),
    industry: readString(formData, "industry"),
    country: readString(formData, "country"),
    askingPrice: readString(formData, "askingPrice"),
    revenue: readString(formData, "revenue"),
    ebitda: readString(formData, "ebitda"),
    employees: readString(formData, "employees"),
  };

  const fieldErrors: Partial<Record<keyof AssetFormValues, string>> = {};

  if (!values.title) {
    fieldErrors.title = "Введіть назву.";
  } else if (values.title.length > 200) {
    fieldErrors.title = "Назва занадто довга.";
  }

  if (!values.description) {
    fieldErrors.description = "Введіть опис.";
  } else if (values.description.length > 5000) {
    fieldErrors.description = "Опис занадто довгий.";
  }

  if (!values.assetType) {
    fieldErrors.assetType = "Оберіть тип активу.";
  }

  if (!values.industry) {
    fieldErrors.industry = "Оберіть галузь.";
  }

  if (!values.country) {
    fieldErrors.country = "Оберіть країну.";
  }

  const askingPrice = Number(values.askingPrice.replace(",", "."));
  if (!values.askingPrice || !Number.isFinite(askingPrice) || askingPrice < 0) {
    fieldErrors.askingPrice = "Введіть коректну ціну пропозиції.";
  }

  let revenue: number | null = null;
  if (values.revenue) {
    const parsed = Number(values.revenue.replace(",", "."));
    if (!Number.isFinite(parsed) || parsed < 0) {
      fieldErrors.revenue = "Введіть коректний дохід.";
    } else {
      revenue = parsed;
    }
  }

  let ebitda: number | null = null;
  if (values.ebitda) {
    const parsed = Number(values.ebitda.replace(",", "."));
    if (!Number.isFinite(parsed) || parsed < 0) {
      fieldErrors.ebitda = "Введіть коректний EBITDA.";
    } else {
      ebitda = parsed;
    }
  }

  let employees: number | null = null;
  if (values.employees) {
    const parsed = Number(values.employees);
    if (!Number.isInteger(parsed) || parsed < 0) {
      fieldErrors.employees = "Введіть коректну кількість співробітників.";
    } else {
      employees = parsed;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: {
        error: "Перевірте обов’язкові поля та числові значення.",
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    data: {
      title: values.title,
      description: values.description,
      assetType: values.assetType,
      industry: values.industry,
      country: values.country,
      askingPrice,
      revenue,
      ebitda,
      employees,
    },
  };
}
