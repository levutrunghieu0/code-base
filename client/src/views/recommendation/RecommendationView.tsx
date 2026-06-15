import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/i18n/I18nProvider';

const rows = [
  { product: 'PRODUCT001', currentStock: 50, forecast: 120, safetyStock: 30, recommended: 100 },
  { product: 'PRODUCT002', currentStock: 140, forecast: 90, safetyStock: 18, recommended: 0 },
];

export default function RecommendationView() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('recommendations.title')}</h1>
        <p className="text-muted-foreground">{t('recommendations.subtitle')}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('recommendations.optimization')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.product}
              className="grid gap-2 rounded-lg border p-3 text-sm md:grid-cols-5"
            >
              <strong>{row.product}</strong>
              <span>
                {t('recommendations.current')}: {row.currentStock}
              </span>
              <span>
                {t('dashboard.forecast')}: {row.forecast}
              </span>
              <span>
                {t('recommendations.safety')}: {row.safetyStock}
              </span>
              <span>
                {t('recommendations.recommended')}: {row.recommended}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
