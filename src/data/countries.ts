export const countryMarks: Record<
  string,
  { code: string; className: string }
> = {
  Німеччина: { code: "DE", className: "bg-[#163a66]" },
  Австрія: { code: "AT", className: "bg-[#1f4f7a]" },
  Нідерланди: { code: "NL", className: "bg-[#0f5f6b]" },
  Польща: { code: "PL", className: "bg-[#1d4e6f]" },
  Чехія: { code: "CZ", className: "bg-[#2a4a7a]" },
  Іспанія: { code: "ES", className: "bg-[#1b4d62]" },
  Франція: { code: "FR", className: "bg-[#1a3f73]" },
  Україна: { code: "UA", className: "bg-[#185f8c]" },
  Швеція: { code: "SE", className: "bg-[#1c5678]" },
};

export function getCountryMark(country: string) {
  return (
    countryMarks[country] ?? {
      code: country.slice(0, 2).toUpperCase(),
      className: "bg-foreground",
    }
  );
}
