import type { Metadata } from 'next';

// Страница ввода пароля для закрытой презентации /temu.
// Оформление повторяет главную ustores.uz: тёмный фон, янтарно-оранжевые акценты.

export const metadata: Metadata = {
  title: 'Ustores × Temu — private access',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: { error?: string; next?: string };
}

export default function TemuLoginPage({ searchParams }: PageProps) {
  const hasError = searchParams.error === '1';
  const next = searchParams.next && searchParams.next.startsWith('/temu') ? searchParams.next : '/temu';

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Фон как в герое главной */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px] motion-safe:animate-blob will-change-transform" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[120px] motion-safe:animate-blob motion-safe:[animation-delay:-7s] will-change-transform" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-white/10 p-8 sm:p-10 backdrop-blur-xl motion-safe:animate-scale-in">
          <div className="absolute -top-px -right-px w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-tr-3xl rounded-bl-3xl opacity-20" />

          <div className="flex items-center gap-3 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ustores" className="h-9 w-auto" />
            <span className="text-slate-500 text-lg">×</span>
            <span className="text-xl font-bold" style={{ color: '#FB7701' }}>
              Temu
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
            Private presentation
          </h1>
          <p className="text-slate-400 text-sm mb-1">
            This page is for the Temu team. Enter the access password you received from Ustores.
          </p>
          <p className="text-slate-500 text-xs mb-8">
            Закрытая презентация для команды Temu. Введите пароль, который вам передал Ustores.
          </p>

          <form method="POST" action="/api/temu-auth" className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                placeholder="Password · Пароль"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition"
              />
            </label>

            {hasError && (
              <p className="text-sm text-red-400" role="alert">
                Wrong password, try again · Неверный пароль, попробуйте ещё раз
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
            >
              Open presentation · Открыть
            </button>
          </form>

          <p className="mt-8 text-xs text-slate-500 text-center">
            Need access?{' '}
            <a href="https://t.me/Ivan_Korotaev" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
              Message Ustores in Telegram
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
