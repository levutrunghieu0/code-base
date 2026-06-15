import { Link } from '@tanstack/react-router';
import { Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/i18n/I18nProvider';

export default function HomeView() {
  const { t } = useI18n();

  return (
    <div className="container py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('home.title')}</h1>
        <p className="mb-8 text-xl text-muted-foreground">{t('home.subtitle')}</p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/login">{t('home.getStarted')}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/register">{t('common.register')}</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Shield className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>{t('nav.admin')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{t('home.admin.description')}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3 className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>{t('manager.managers')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {t('home.manager.description')}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Users className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>{t('nav.users')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{t('home.user.description')}</CardContent>
        </Card>
      </div>
    </div>
  );
}
