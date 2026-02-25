import { Language, getTranslation } from '@/lib/translations';

interface CTAProps {
  lang: Language;
}

export function CTA({ lang }: CTAProps) {
  const t = getTranslation(lang);

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 mb-6 sm:mb-8 shadow-2xl shadow-amber-500/25">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          {t.cta.title}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
          {t.cta.subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://t.me/Ivan_Korotaev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
          >
            {t.cta.buttons.connect}
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="https://t.me/Ivan_Korotaev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all"
          >
            {t.cta.buttons.conditions}
          </a>
          <a
            href="https://t.me/Ivan_Korotaev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all"
          >
            {t.cta.buttons.presentation}
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs sm:text-sm">{lang === 'ru' ? 'Быстрый запуск' : lang === 'en' ? 'Fast launch' : '快速启动'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs sm:text-sm">{lang === 'ru' ? 'Оплата от объёма' : lang === 'en' ? 'Volume-based pricing' : '按量付费'}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs sm:text-sm">{lang === 'ru' ? '25+ точек в Ташкенте' : lang === 'en' ? '25+ points in Tashkent' : '塔什干25+网点'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
