import { Language, getTranslation } from '@/lib/translations';

interface WhatIsItProps {
  lang: Language;
}

export function WhatIsIt({ lang }: WhatIsItProps) {
  const t = getTranslation(lang);

  const featureIcons = [
    <svg key="0" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>,
    <svg key="1" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>,
    <svg key="2" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    <svg key="3" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="4" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
  ];

  return (
    <section id="how-it-works" className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-6">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-amber-400 text-xs sm:text-sm font-medium">{t.whatIsIt.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.whatIsIt.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {t.whatIsIt.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Features */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">{t.whatIsIt.whatWeDo.title}</h3>
            {t.whatIsIt.whatWeDo.items.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {featureIcons[index]}
                </div>
                <div className="flex-1">
                  <span className="text-sm sm:text-base text-slate-300 leading-relaxed">{feature}</span>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="relative">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8">{t.whatIsIt.howToConnect.title}</h3>
            
            <div className="space-y-6 sm:space-y-8">
              {t.whatIsIt.howToConnect.items.map((step, index) => (
                <div key={index} className="relative flex gap-4 sm:gap-6">
                  {/* Timeline line */}
                  {index < t.whatIsIt.howToConnect.items.length - 1 && (
                    <div className="absolute left-5 sm:left-6 top-12 bottom-0 w-px bg-gradient-to-b from-amber-500/50 to-transparent" />
                  )}
                  
                  {/* Step number */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                    <span className="text-slate-950 font-bold text-sm sm:text-base">{index + 1}</span>
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-1 pt-1.5 sm:pt-2 pb-2">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{lang === 'ru' ? 'Готовы начать?' : lang === 'en' ? 'Ready to start?' : lang === 'uz' ? 'Boshlashga tayyormisiz?' : '准备开始？'}</h4>
                  <p className="text-sm text-slate-400">{lang === 'ru' ? 'Свяжитесь с нами для обсуждения условий' : lang === 'en' ? 'Contact us to discuss terms' : lang === 'uz' ? "Shartlarni muhokama qilish uchun biz bilan bog'laning" : '联系我们讨论条款'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
