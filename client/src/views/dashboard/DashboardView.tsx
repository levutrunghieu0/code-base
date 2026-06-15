import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, LineChart, PackageSearch, Percent, TrendingUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import type { TranslationKey } from '@/i18n/translations';

const summaryCards: Array<{
  titleKey: TranslationKey;
  value: string;
  icon: typeof BarChart3;
  helperKey: TranslationKey | 'dashboard.accuracyHelper';
}> = [
  {
    titleKey: 'dashboard.totalSales',
    value: '$128,450',
    icon: BarChart3,
    helperKey: 'dashboard.historicalSalesAmount',
  },
  {
    titleKey: 'dashboard.forecastDemand',
    value: '9,860',
    icon: TrendingUp,
    helperKey: 'dashboard.next30Days',
  },
  {
    titleKey: 'dashboard.forecastAccuracy',
    value: 'MAPE 8.4%',
    icon: Percent,
    helperKey: 'dashboard.accuracyHelper',
  },
  {
    titleKey: 'dashboard.inventoryRisk',
    value: '14 SKUs',
    icon: PackageSearch,
    helperKey: 'dashboard.needPurchaseReview',
  },
];

const trendRows = [
  { date: '2026-07-01', historical: 100, forecast: 120 },
  { date: '2026-07-02', historical: 108, forecast: 124 },
  { date: '2026-07-03', historical: 116, forecast: 131 },
  { date: '2026-07-04', historical: 112, forecast: 128 },
];

const processSteps: TranslationKey[] = [
  'dashboard.step.loadHistoricalSales',
  'dashboard.step.dataCleaning',
  'dashboard.step.featureEngineering',
  'dashboard.step.forecastModel',
  'dashboard.step.generatePrediction',
  'dashboard.step.storeForecastResult',
];

export default function DashboardView() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.titleKey}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{t(item.titleKey)}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {item.value}
                  {item.titleKey === 'dashboard.forecastDemand' ? ` ${t('common.units')}` : ''}
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.helperKey === 'dashboard.accuracyHelper'
                    ? 'MAE 12.6 / RMSE 18.2'
                    : t(item.helperKey)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" /> {t('dashboard.historyVsForecast')}
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
                  <span>
                    {t('dashboard.actual')}: {row.historical}
                  </span>
                  <Badge variant="secondary">
                    {t('dashboard.forecast')}: {row.forecast}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.process')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              {processSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <Badge>{index + 1}</Badge>
                  <span>{t(step)}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
