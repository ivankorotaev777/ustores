'use client';

import { Language, languages, getTranslation } from '@/lib/translations';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const t = getTranslation(lang);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <img src="/logo.png" alt="Ustores" className="h-12 sm:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href={`/${lang}#benefits`} className="text-slate-300 hover:text-white transition-colors text-sm">
              {t.nav.benefits}
            </a>
            <a href={`/${lang}#how-it-works`} className="text-slate-300 hover:text-white transition-colors text-sm">
              {t.nav.howItWorks}
            </a>
            <a href={`/${lang}#pricing`} className="text-slate-300 hover:text-white transition-colors text-sm">
              {t.nav.pricing}
            </a>
            <Link href={`/${lang}/contacts`} className="text-slate-300 hover:text-white transition-colors text-sm">
              {t.nav.contact}
            </Link>
            <Link href={`/${lang}/rent`} className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
              {t.nav.forLandlords}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <span className="text-base sm:text-lg">{currentLang.flag}</span>
                <span className="text-slate-300 text-xs sm:text-sm hidden sm:inline">{currentLang.code.toUpperCase()}</span>
                <svg
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 py-2 bg-slate-900 rounded-xl border border-white/10 shadow-2xl min-w-[140px]">
                  {languages.map((language) => (
                    <Link
                      key={language.code}
                      href={`/${language.code}`}
                      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors ${
                        language.code === lang ? 'text-amber-400' : 'text-slate-300'
                      }`}
                      onClick={() => setIsLangOpen(false)}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href="https://t.me/Ivan_Korotaev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
            >
              {t.nav.contact}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-2">
              <a
                href={`/${lang}#benefits`}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.benefits}
              </a>
              <a
                href={`/${lang}#how-it-works`}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.howItWorks}
              </a>
              <a
                href={`/${lang}#pricing`}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.pricing}
              </a>
              <Link
                href={`/${lang}/contacts`}
                className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <Link
                href={`/${lang}/rent`}
                className="px-4 py-3 text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.forLandlords}
              </Link>
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 mt-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {lang === 'ru' ? 'Написать' : lang === 'en' ? 'Message' : lang === 'uz' ? 'Yozish' : '发消息'}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
