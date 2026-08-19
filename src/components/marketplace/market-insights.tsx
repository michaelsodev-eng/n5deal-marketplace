import { CountryMark } from "@/components/assets/country-mark";
import { Card } from "@/components/ui/card";
import { TrendSparkline } from "@/components/marketplace/trend-sparkline";
import {
  activeMarkets,
  industryMix,
  marketStats,
  marketTrendLabels,
  marketTrendPoints,
} from "@/data/market-insights";

export function MarketInsights() {
  return (
    <aside className="space-y-4 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
      <Card className="p-4 sm:p-5">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Огляд ринку
        </p>
        <h2 className="mt-1 text-base font-semibold text-foreground">
          Ринкова динаміка
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Індикативний зріз активності майданчика за останні шість місяців.
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-2">
          {marketStats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-slate-50 px-2 py-2.5">
              <dt className="text-[10px] leading-4 text-muted">{stat.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5">
          <p className="text-xs font-medium text-foreground">Нові пропозиції</p>
          <TrendSparkline values={marketTrendPoints} labels={marketTrendLabels} />
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground">
          Розподіл за галузями
        </h3>
        <ul className="mt-4 space-y-3">
          {industryMix.map((item) => (
            <li key={item.label}>
              <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                <span className="text-muted">{item.label}</span>
                <span className="font-medium text-foreground">{item.share}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.share}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground">Активні ринки</h3>
        <ul className="mt-4 space-y-3">
          {activeMarkets.map((item) => (
            <li
              key={item.country}
              className="flex items-center justify-between gap-3"
            >
              <CountryMark country={item.country} />
              <span className="text-xs font-medium text-muted">
                {item.listings}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
