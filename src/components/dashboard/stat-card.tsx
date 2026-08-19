import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </Card>
  );
}
