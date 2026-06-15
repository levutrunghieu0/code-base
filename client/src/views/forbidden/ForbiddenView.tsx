import { Link } from '@tanstack/react-router';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

export default function ForbiddenView() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <ShieldX className="h-16 w-16 text-destructive" />
      <h1 className="text-6xl font-bold text-muted-foreground">403</h1>
      <h2 className="text-2xl font-semibold">{t('error.accessDenied')}</h2>
      <p className="text-muted-foreground">{t('error.noPermission')}</p>
      <Button asChild>
        <Link to="/dashboard">{t('error.backToDashboard')}</Link>
      </Button>
    </div>
  );
}
