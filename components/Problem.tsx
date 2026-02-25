import { Language, getTranslation } from '@/lib/translations';

interface ProblemProps {
  lang: Language;
}

export function Problem({ lang }: ProblemProps) {
  const t = getTranslation(lang);

  const icons = [
    <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>,
    <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>,
  ];

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 sm:mb-6">
            <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-orange-400 text-xs sm:text-sm font-medium">{t.problem.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.problem.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.problem.subtitle}
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {t.problem.problems.map((problem, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-orange-500/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {icons[index]}
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                {problem.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {problem.description}
              </p>

              {/* Number indicator */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-5xl font-bold text-white/5 group-hover:text-orange-500/10 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            {t.problem.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
