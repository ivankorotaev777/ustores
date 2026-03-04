'use client';

import { Language, languages, getTranslation } from '@/lib/translations';
import Link from 'next/link';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const t = getTranslation(lang);

  return (
    <footer className="relative py-6 sm:py-8 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center mb-4">
              <img src="/logo.png" alt="Ustores" className="h-16 w-auto" />
            </Link>
            <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer.links.company}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#benefits" className="text-sm sm:text-base text-slate-400 hover:text-amber-400 transition-colors">
                  {t.nav.benefits}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm sm:text-base text-slate-400 hover:text-amber-400 transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm sm:text-base text-slate-400 hover:text-amber-400 transition-colors">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <Link href={`/${lang}/rent`} className="text-sm sm:text-base text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  {t.nav.forLandlords}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">{lang === 'ru' ? 'Язык' : lang === 'en' ? 'Language' : lang === 'uz' ? 'Til' : '语言'}</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={`/${language.code}`}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    language.code === lang
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {language.flag} {language.code.toUpperCase()}
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-500">
            {t.footer.copyright}
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-xs sm:text-sm text-slate-500 hover:text-slate-400 transition-colors">
              {t.footer.links.privacy}
            </a>
            <a href="#" className="text-xs sm:text-sm text-slate-500 hover:text-slate-400 transition-colors">
              {t.footer.links.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
