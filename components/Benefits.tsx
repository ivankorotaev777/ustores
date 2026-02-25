import { Language, getTranslation } from '@/lib/translations';

interface BenefitsProps {
  lang: Language;
}

export function Benefits({ lang }: BenefitsProps) {
  const t = getTranslation(lang);

  const icons = [
    <svg key="0" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="1" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>,
    <svg key="2" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
  ];

  const gradients = [
    'from-amber-400 to-orange-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-amber-500',
  ];

  return (
    <section id="benefits" className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400 text-xs sm:text-sm font-medium">{t.benefits.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.benefits.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {t.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-amber-500/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} p-0.5 mb-5 sm:mb-6`}>
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                  {icons[index]}
                </div>
              </div>

              {/* Stat */}
              <div className="mb-3 sm:mb-4">
                <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent`}>
                  {benefit.highlight}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {benefit.description}
              </p>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className={`w-6 h-6 text-amber-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
