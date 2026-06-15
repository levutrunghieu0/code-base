import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

export default function NotFoundView() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold">{t('error.notFound')}</h2>
      <p className="text-muted-foreground">{t('error.notFoundDescription')}</p>
      <Button asChild>
        <Link to="/">{t('error.goHome')}</Link>
      </Button>
    </div>
  );
}
