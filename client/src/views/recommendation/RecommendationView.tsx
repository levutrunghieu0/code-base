import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const rows = [
  { product: 'PRODUCT001', currentStock: 50, forecast: 120, safetyStock: 30, recommended: 100 },
  { product: 'PRODUCT002', currentStock: 140, forecast: 90, safetyStock: 18, recommended: 0 },
];

export default function RecommendationView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Purchase Recommendations</h1>
        <p className="text-muted-foreground">
          Recommended Purchase = Forecast Demand + Safety Stock - Current Inventory.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Optimization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.product}
              className="grid gap-2 rounded-lg border p-3 text-sm md:grid-cols-5"
            >
              <strong>{row.product}</strong>
              <span>Current: {row.currentStock}</span>
              <span>Forecast: {row.forecast}</span>
              <span>Safety: {row.safetyStock}</span>
              <span>Recommended: {row.recommended}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
