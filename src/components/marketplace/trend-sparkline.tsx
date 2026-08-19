type TrendSparklineProps = {
  values: number[];
  labels: string[];
};

export function TrendSparkline({ values, labels }: TrendSparklineProps) {
  const width = 280;
  const height = 96;
  const paddingX = 8;
  const paddingY = 10;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  const points = values.map((value, index) => {
    const x =
      paddingX + (index / Math.max(values.length - 1, 1)) * (width - paddingX * 2);
    const y =
      height - paddingY - ((value - min) / range) * (height - paddingY * 2);
    return { x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = [
    `M ${points[0].x} ${height - paddingY}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1].x} ${height - paddingY}`,
    "Z",
  ].join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height + 22}`}
      className="h-28 w-full"
      role="img"
      aria-label="Динаміка нових пропозицій за шість місяців"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#trendFill)" />
      <path d={linePath} fill="none" stroke="#1d4ed8" strokeWidth="2.2" />
      {points.map((point, index) => (
        <circle
          key={labels[index]}
          cx={point.x}
          cy={point.y}
          r={index === points.length - 1 ? 3.4 : 2.4}
          fill={index === points.length - 1 ? "#1d4ed8" : "#ffffff"}
          stroke="#1d4ed8"
          strokeWidth="1.6"
        />
      ))}
      {points.map((point, index) => (
        <text
          key={`${labels[index]}-label`}
          x={point.x}
          y={height + 18}
          textAnchor="middle"
          fill="#5b6b82"
          fontSize="10"
        >
          {labels[index]}
        </text>
      ))}
    </svg>
  );
}
