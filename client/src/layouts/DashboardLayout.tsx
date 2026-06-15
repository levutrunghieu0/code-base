import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="flex h-screen overflow-hidden bg-muted/10">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label={t('nav.closeMenu')}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full max-w-[18rem] animate-in slide-in-from-left duration-200">
            <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur lg:hidden">
          <div>
            <p className="text-sm font-semibold">{t('app.name')}</p>
            <p className="text-xs text-muted-foreground">{t('common.dashboard')}</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
