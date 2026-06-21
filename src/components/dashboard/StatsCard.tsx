import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsCardProps } from "@/types";

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
