import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const periods = ['Next 7 Days', 'Next 30 Days', 'Next 90 Days'];
const features = [
  'day_of_week',
  'week_of_year',
  'month',
  'quarter',
  'lag_1',
  'lag_7',
  'lag_14',
  'lag_30',
  'rolling_avg_7',
  'rolling_avg_30',
  'rolling_avg_90',
];

export default function ForecastView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Forecast Generation</h1>
        <p className="text-muted-foreground">
          Generate and monitor demand forecasts by store, product, and category.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Forecast Periods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {periods.map((p) => (
              <Badge key={p} className="mr-2">
                {p}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Models</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Phase 1: Moving Average, Prophet</p>
            <p>Phase 2: XGBoost, LightGBM</p>
            <p>Phase 3: Vertex AI Forecasting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>MAPE, MAE, and RMSE are calculated for forecast monitoring.</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Engineering</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {features.map((f) => (
            <Badge key={f} variant="secondary">
              {f}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
