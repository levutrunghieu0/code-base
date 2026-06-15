import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/I18nProvider';

const rows = [
  {
    store: 'STORE001',
    product: 'PRODUCT001',
    category: 'GROCERY',
    date: '2026-06-01',
    quantity: 100,
    amount: 2500,
    gp: 420,
  },
  {
    store: 'STORE001',
    product: 'PRODUCT002',
    category: 'FRESH',
    date: '2026-06-01',
    quantity: 86,
    amount: 1720,
    gp: 310,
  },
];

export default function SalesHistoryView() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('sales.title')}</h1>
        <p className="text-muted-foreground">{t('sales.subtitle')}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('sales.collection')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row) => (
            <div
              key={`${row.product}-${row.date}`}
              className="grid gap-2 rounded-lg border p-3 text-sm md:grid-cols-7"
            >
              <span>{row.store}</span>
              <span>{row.product}</span>
              <Badge variant="secondary">{row.category}</Badge>
              <span>{row.date}</span>
              <span>
                {t('sales.qty')} {row.quantity}
              </span>
              <span>${row.amount}</span>
              <span>GP ${row.gp}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
