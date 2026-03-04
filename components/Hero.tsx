import { Language, getTranslation } from '@/lib/translations';

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const t = getTranslation(lang);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs sm:text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                Ustores —{' '}
              </span>
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              {t.hero.description}
            </p>

            {/* Highlight */}
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm sm:text-base text-amber-200 font-medium">{t.hero.highlight}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative lg:pl-8">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              {/* Decorative corner */}
              <div className="absolute -top-px -right-px w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-tr-3xl rounded-bl-3xl opacity-20" />
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/5">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                    30+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">{t.hero.stats.points}</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/5">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                    80k+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">{t.hero.stats.orders}</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/5">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                    99%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">{t.hero.stats.sla}</div>
                </div>
              </div>

              {/* Interactive Yandex Map */}
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A7fa9f23f629ecba01049995161ff013c36ff705d79a13dc237ab8407ed000f69&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: '1rem' }}
                />
              </div>

              {/* Quick action */}
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all group"
              >
                {t.hero.cta3}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Floating badges */}
            <div className="hidden sm:block absolute -left-4 top-1/4 px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10 backdrop-blur-xl shadow-xl animate-float">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-white font-medium">SLA 99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
