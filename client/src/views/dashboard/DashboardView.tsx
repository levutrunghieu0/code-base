import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, LineChart, PackageSearch, Percent, TrendingUp } from 'lucide-react';

const summaryCards = [
  { title: 'Total Sales', value: '$128,450', icon: BarChart3, helper: 'Historical sales amount' },
  { title: 'Forecast Demand', value: '9,860 units', icon: TrendingUp, helper: 'Next 30 days' },
  { title: 'Forecast Accuracy', value: 'MAPE 8.4%', icon: Percent, helper: 'MAE 12.6 / RMSE 18.2' },
  {
    title: 'Inventory Risk',
    value: '14 SKUs',
    icon: PackageSearch,
    helper: 'Need purchase review',
  },
];

const trendRows = [
  { date: '2026-07-01', historical: 100, forecast: 120 },
  { date: '2026-07-02', historical: 108, forecast: 124 },
  { date: '2026-07-03', historical: 116, forecast: 131 },
  { date: '2026-07-04', historical: 112, forecast: 128 },
];

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Sales Forecast Dashboard</h1>
        <p className="text-muted-foreground">
          Historical trend, forecast demand, accuracy, and inventory risk.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.helper}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" /> Historical Sales vs Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendRows.map((row) => (
                <div
                  key={row.date}
                  className="grid grid-cols-3 items-center gap-3 rounded-lg border p-3 text-sm"
                >
                  <span className="font-medium">{row.date}</span>
                  <span>Actual: {row.historical}</span>
                  <Badge variant="secondary">Forecast: {row.forecast}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              {[
                'Load Historical Sales',
                'Data Cleaning',
                'Feature Engineering',
                'Forecast Model',
                'Generate Prediction',
                'Store Forecast Result',
              ].map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <Badge>{index + 1}</Badge>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
