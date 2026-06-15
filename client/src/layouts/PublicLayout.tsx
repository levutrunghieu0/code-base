import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/store/auth.store';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nProvider';

interface Props {
  children: React.ReactNode;
}

export function PublicLayout({ children }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="text-lg font-bold text-primary">
            {t('app.name')}
          </Link>
          <nav className="flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-sm font-medium text-primary hover:underline">
                {t('common.dashboard')}
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium hover:underline">
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  {t('common.register')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {t('app.name')}
      </footer>
    </div>
  );
}
