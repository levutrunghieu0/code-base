import { Moon, RotateCcw, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { useTheme } from '@/theme/ThemeProvider';

const presetColors = ['#2563eb', '#7c3aed', '#dc2626', '#16a34a', '#ea580c', '#0891b2'];

export function ThemeCustomizer() {
  const { t } = useI18n();
  const { mode, primaryColor, setMode, setPrimaryColor, resetTheme } = useTheme();

  return (
    <div className="space-y-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
            {t('theme.title')}
          </p>
          <p className="text-xs text-sidebar-foreground/50">{t('theme.description')}</p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-sidebar-foreground/70 hover:bg-white/10 hover:text-white"
          aria-label={t('theme.reset')}
          onClick={resetTheme}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-black/10 p-1">
        <button
          type="button"
          onClick={() => setMode('light')}
          className={`flex items-center justify-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
            mode === 'light'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-sidebar-foreground/70 hover:bg-white/10 hover:text-white'
          }`}
          aria-pressed={mode === 'light'}
        >
          <Sun className="h-3.5 w-3.5" />
          {t('theme.light')}
        </button>
        <button
          type="button"
          onClick={() => setMode('dark')}
          className={`flex items-center justify-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
            mode === 'dark'
              ? 'bg-white text-slate-950 shadow-sm'
              : 'text-sidebar-foreground/70 hover:bg-white/10 hover:text-white'
          }`}
          aria-pressed={mode === 'dark'}
        >
          <Moon className="h-3.5 w-3.5" />
          {t('theme.dark')}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
          <span>{t('theme.color')}</span>
          <input
            type="color"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
            className="h-7 w-9 cursor-pointer rounded border border-white/20 bg-transparent p-0.5"
            aria-label={t('theme.color')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setPrimaryColor(color)}
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                primaryColor === color ? 'border-white' : 'border-white/20'
              }`}
              style={{ backgroundColor: color }}
              aria-label={t('theme.color')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
