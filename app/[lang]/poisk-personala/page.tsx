import { Metadata } from 'next';
import { Language, languages } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimateOnView } from '@/components/AnimateOnView';
import {
  getPoiskPersonalaContent,
  POISK_PERSONALA_TELEGRAM,
  type PoiskPersonalaContent,
} from '@/lib/poisk-personala-content';

interface PageProps {
  params: { lang: string };
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang: lang.code }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';
  const c = getPoiskPersonalaContent(validLang);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
  };
}

function TelegramCta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={POISK_PERSONALA_TELEGRAM}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-base hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5 ${className}`}
    >
      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
      {children}
    </a>
  );
}

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 sm:p-8 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-safe:hover:border-amber-500/20 motion-safe:hover:shadow-lg motion-safe:hover:shadow-amber-500/5 ${className}`}
    >
      {children}
    </div>
  );
}

export default function PoiskPersonalaPage({ params }: PageProps) {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';
  const t: PoiskPersonalaContent = getPoiskPersonalaContent(validLang);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <Header lang={validLang} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] bg-amber-500/10 rounded-full blur-[120px] motion-safe:animate-blob will-change-transform" />
        </div>
        <AnimateOnView>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6 leading-tight">
                {t.hero.h1}
              </h1>
              <p className="text-lg sm:text-xl text-amber-400/90 font-medium mb-6">{t.hero.subtitle}</p>
              <div className="space-y-4 text-slate-300 text-left text-base sm:text-lg leading-relaxed mb-8">
                {t.hero.lead.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <SectionCard className="text-left mb-8 border-amber-500/20 bg-amber-500/5">
                {t.hero.pricing.map((line, i) => (
                  <p key={i} className="text-white font-medium">
                    {line}
                  </p>
                ))}
              </SectionCard>
              <TelegramCta>{t.cta}</TelegramCta>
              <p className="mt-4 text-sm sm:text-base text-slate-400">{t.hero.ctaHint}</p>
            </div>

            <AnimateOnView delay={120}>
            <div className="justify-self-center lg:justify-self-end w-full max-w-[440px]">
              <img
                src="/PVZ.png"
                alt="Пункт выдачи заказов"
                className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl shadow-black/50 mix-blend-screen [filter:contrast(1.22)_brightness(1.02)]"
              />
            </div>
            </AnimateOnView>
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Risk / penalties */}
      <section className="relative py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t.risk.title}</h2>
          <p className="text-slate-400 text-center mb-10 text-lg leading-relaxed">{t.risk.intro}</p>

          <div className="rounded-2xl border-2 border-red-500/40 bg-red-950/20 p-6 sm:p-8 mb-8">
            <h3 className="text-lg font-semibold text-red-200 mb-4">{t.risk.penaltiesTitle}</h3>
            <ul className="space-y-3">
              {t.risk.penalties.map((row, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="text-slate-300">{row.label}</span>
                  <span className="text-white font-semibold text-lg tabular-nums">{row.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-slate-400 leading-relaxed mb-10">
            {t.risk.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <TelegramCta>{t.cta}</TelegramCta>
            <a
              href={t.risk.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-slate-500 hover:text-amber-400/90 underline underline-offset-2 text-center"
            >
              {t.risk.sourceLabel}
            </a>
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Why Ustores */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">{t.why.title}</h2>
          <div className="space-y-4 text-slate-400 max-w-3xl mx-auto text-center leading-relaxed mb-12">
            {t.why.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.why.stats.map((s, i) => (
              <SectionCard key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </SectionCard>
            ))}
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Advantages */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView delay={60}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {t.advantages.map((a, i) => (
              <SectionCard key={i}>
                <h3 className="text-xl font-semibold text-white mb-3">{a.title}</h3>
                <p className="text-slate-400 leading-relaxed">{a.text}</p>
              </SectionCard>
            ))}
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Service includes */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView delay={40}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t.service.title}</h2>
          <p className="text-slate-400 text-center mb-10 leading-relaxed">{t.service.intro}</p>
          <ol className="space-y-4">
            {t.service.items.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 flex-1">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        </AnimateOnView>
      </section>

      {/* Timeline */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{t.timeline.title}</h2>
          <div className="relative">
            <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-amber-500/30 hidden sm:block" aria-hidden />
            <ul className="space-y-6">
              {t.timeline.steps.map((step, i) => (
                <li key={i} className="relative flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-bold text-sm flex items-center justify-center z-10">
                    {i + 1}
                  </div>
                  <SectionCard className="flex-1 py-5">
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{step.text}</p>
                  </SectionCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Pricing */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView delay={50}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">{t.pricing.title}</h2>
          <SectionCard className="text-left">
            <div className="text-center mb-6 pb-6 border-b border-white/10">
              <div className="text-amber-400 text-sm font-medium uppercase tracking-wide mb-2">{t.pricing.tariffName}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{t.pricing.price}</div>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">{t.pricing.paymentTitle}</h3>
            <ul className="space-y-2 text-slate-400 mb-8">
              {t.pricing.paymentLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">{t.pricing.includesTitle}</h3>
            <ul className="space-y-2 text-slate-400 list-disc pl-5 mb-6">
              {t.pricing.includes.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 leading-relaxed">{t.pricing.note}</p>
          </SectionCard>
          <div className="mt-8 flex justify-center">
            <TelegramCta>{t.cta}</TelegramCta>
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Audience */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{t.audience.title}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.audience.cards.map((c, i) => (
              <SectionCard key={i}>
                <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-slate-400 leading-relaxed">{c.text}</p>
              </SectionCard>
            ))}
          </div>
        </div>
        </AnimateOnView>
      </section>

      {/* Client checklist */}
      <section className="py-14 sm:py-16 border-t border-white/5">
        <AnimateOnView delay={40}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t.clientNeeds.title}</h2>
          <p className="text-slate-400 text-center mb-8">{t.clientNeeds.intro}</p>
          <SectionCard>
            <ul className="space-y-3 text-slate-300 list-disc pl-5">
              {t.clientNeeds.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </SectionCard>
        </div>
        </AnimateOnView>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <AnimateOnView>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.finalCta.title}</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">{t.finalCta.body}</p>
          <SectionCard className="text-left mb-8">
            <h3 className="text-sm font-semibold text-amber-400 mb-4">{t.finalCta.checklistTitle}</h3>
            <ul className="space-y-2 text-slate-400 list-disc pl-5 text-sm sm:text-base">
              {t.finalCta.checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </SectionCard>
          <TelegramCta className="w-full sm:w-auto">{t.cta}</TelegramCta>
          <p className="mt-4 text-sm text-slate-500">{t.finalCta.footnote}</p>
        </div>
        </AnimateOnView>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 border-t border-white/5 pb-8">
        <AnimateOnView delay={60}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            {validLang === 'ru' ? 'Частые вопросы' : 'FAQ'}
          </h2>
          <div className="space-y-3">
            {t.faq.map((item, index) => (
              <details
                key={index}
                className="group rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm sm:text-base text-left">{item.q}</span>
                  <svg
                    className="w-5 h-5 text-amber-400 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        </AnimateOnView>
      </section>

      <Footer lang={validLang} />
    </main>
  );
}
