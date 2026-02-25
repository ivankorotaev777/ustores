import { Language, languages } from '@/lib/translations';

interface LayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function LangLayout({ children, params }: LayoutProps) {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';

  return (
    <div lang={validLang} className="min-h-screen">
      {children}
    </div>
  );
}
