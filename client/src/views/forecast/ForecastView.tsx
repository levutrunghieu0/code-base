import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/I18nProvider';
import type { TranslationKey } from '@/i18n/translations';

const periodKeys: TranslationKey[] = ['forecast.next7', 'forecast.next30', 'forecast.next90'];
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
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('forecast.title')}</h1>
        <p className="text-muted-foreground">{t('forecast.subtitle')}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('forecast.periods')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {periodKeys.map((key) => (
              <Badge key={key} className="mr-2">
                {t(key)}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('forecast.models')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{t('forecast.phase1')}</p>
            <p>{t('forecast.phase2')}</p>
            <p>{t('forecast.phase3')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('forecast.accuracy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t('forecast.accuracyDescription')}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('forecast.featureEngineering')}</CardTitle>
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
