import { Language, getTranslation } from '@/lib/translations';

interface PricingProps {
  lang: Language;
}

export function Pricing({ lang }: PricingProps) {
  const t = getTranslation(lang);

  return (
    <section id="pricing" className="relative py-6 sm:py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-6">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-amber-400 text-xs sm:text-sm font-medium">{t.pricing.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {t.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-500/50 hover:border-amber-400'
                  : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-amber-500/20'
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs sm:text-sm font-semibold shadow-lg">
                  {plan.tag}
                </div>
              )}

              {/* Tag for non-highlighted */}
              {!plan.highlighted && (
                <div className="mb-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10">
                    {plan.tag}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className={`text-xl sm:text-2xl font-bold text-white ${plan.highlighted ? 'mt-4' : ''} mb-2`}>{plan.name}</h3>
              <p className="text-sm sm:text-base text-slate-400 mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-amber-500/30 text-amber-300' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom notes */}
        <div className="text-center mt-8 sm:mt-12 max-w-2xl mx-auto space-y-2">
          <p className="text-sm sm:text-base text-slate-500">
            {t.pricing.paymentNote}
          </p>
          <p className="text-sm sm:text-base text-amber-400/80 font-medium">
            {t.pricing.minOrder}
          </p>
        </div>
      </div>
    </section>
  );
}
