import { Metadata } from 'next';
import { Language, getTranslation, languages } from '@/lib/translations';
import { Header, Hero, Problem, Benefits, Testimonials, WhatIsIt, Pricing, CTA, Footer } from '@/components';

interface PageProps {
  params: { lang: string };
}

export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';
  const t = getTranslation(validLang);

  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
    },
  };
}

export default function LandingPage({ params }: PageProps) {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';

  return (
    <main className="min-h-screen bg-slate-950">
      <Header lang={validLang} />
      <Hero lang={validLang} />
      <Problem lang={validLang} />
      <Benefits lang={validLang} />
      <Testimonials lang={validLang} />
      <WhatIsIt lang={validLang} />
      <Pricing lang={validLang} />
      <CTA lang={validLang} />
      <Footer lang={validLang} />
    </main>
  );
}
