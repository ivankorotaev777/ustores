import { Metadata } from 'next';
import { Language, getTranslation, languages } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

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
  
  const titles: Record<Language, string> = {
    ru: 'Контакты — Ustores',
    en: 'Contacts — Ustores',
    zh: '联系我们 — Ustores',
    uz: "Kontaktlar — Ustores",
  };

  const descriptions: Record<Language, string> = {
    ru: 'Свяжитесь с нами. Ответим на все вопросы и поможем подобрать подходящие условия.',
    en: 'Contact us. We will answer all your questions and help you find the right terms.',
    zh: '联系我们。我们将回答您的所有问题并帮助您找到合适的条款。',
    uz: "Biz bilan bog'laning. Barcha savollarga javob beramiz va mos shartlarni topishga yordam beramiz.",
  };

  return {
    title: titles[validLang],
    description: descriptions[validLang],
  };
}

export default function ContactsPage({ params }: PageProps) {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';

  const content = {
    ru: {
      title: 'Свяжитесь с нами',
      subtitle: 'Ответим на все вопросы и поможем подобрать подходящие условия. Обычно отвечаем в течение 15 минут.',
      contactInfo: 'Контактная информация',
      phone: 'Телефон',
      phoneNumber: '+998 90 347 86 92',
      phoneHint: 'Нажмите, чтобы позвонить',
      telegram: 'Telegram',
      telegramHandle: '@Ivan_Korotaev',
      telegramHint: 'Быстрые ответы в мессенджере',
      address: 'Адрес офиса',
      addressLine1: 'г. Ташкент, Шайхантахурский район',
      addressLine2: 'массив Джангох, 37',
      workingHours: 'Время работы',
      workingHoursLine1: 'Пн–Пт: 9:00 – 18:00',
      workingHoursLine2: 'Сб–Вс: по договорённости',
      company: 'Компания',
      companyName: 'ООО "Ustores"',
      companyCountry: 'Республика Узбекистан',
      callBtn: 'Позвонить',
      telegramBtn: 'Написать в Telegram',
      mapTitle: 'Мы на карте',
      mapAddress: 'г. Ташкент, Шайхантахурский район, массив Джангох, 37',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We will answer all your questions and help you find the right terms. We usually respond within 15 minutes.',
      contactInfo: 'Contact Information',
      phone: 'Phone',
      phoneNumber: '+998 90 347 86 92',
      phoneHint: 'Click to call',
      telegram: 'Telegram',
      telegramHandle: '@Ivan_Korotaev',
      telegramHint: 'Quick responses in messenger',
      address: 'Office Address',
      addressLine1: 'Tashkent, Shaykhantakhur district',
      addressLine2: 'Djangokh massif, 37',
      workingHours: 'Working Hours',
      workingHoursLine1: 'Mon–Fri: 9:00 – 18:00',
      workingHoursLine2: 'Sat–Sun: by appointment',
      company: 'Company',
      companyName: 'LLC "Ustores"',
      companyCountry: 'Republic of Uzbekistan',
      callBtn: 'Call',
      telegramBtn: 'Message on Telegram',
      mapTitle: 'Find Us on Map',
      mapAddress: 'Tashkent, Shaykhantakhur district, Djangokh massif, 37',
    },
    zh: {
      title: '联系我们',
      subtitle: '我们将回答您的所有问题并帮助您找到合适的条款。通常在15分钟内回复。',
      contactInfo: '联系信息',
      phone: '电话',
      phoneNumber: '+998 90 347 86 92',
      phoneHint: '点击拨打',
      telegram: 'Telegram',
      telegramHandle: '@Ivan_Korotaev',
      telegramHint: '即时通讯快速回复',
      address: '办公地址',
      addressLine1: '塔什干，沙伊汉塔胡尔区',
      addressLine2: 'Djangokh区，37号',
      workingHours: '工作时间',
      workingHoursLine1: '周一至周五：9:00 – 18:00',
      workingHoursLine2: '周六至周日：预约',
      company: '公司',
      companyName: 'Ustores有限责任公司',
      companyCountry: '乌兹别克斯坦共和国',
      callBtn: '拨打电话',
      telegramBtn: '发送Telegram消息',
      mapTitle: '地图位置',
      mapAddress: '塔什干，沙伊汉塔胡尔区，Djangokh区，37号',
    },
    uz: {
      title: "Biz bilan bog'laning",
      subtitle: "Barcha savollarga javob beramiz va mos shartlarni topishga yordam beramiz. Odatda 15 daqiqada javob beramiz.",
      contactInfo: "Aloqa ma'lumotlari",
      phone: 'Telefon',
      phoneNumber: '+998 90 347 86 92',
      phoneHint: "Qo'ng'iroq qilish uchun bosing",
      telegram: 'Telegram',
      telegramHandle: '@Ivan_Korotaev',
      telegramHint: 'Messenjerda tez javoblar',
      address: 'Ofis manzili',
      addressLine1: 'Toshkent shahri, Shayxontohur tumani',
      addressLine2: 'Jangoh dahasi, 37',
      workingHours: 'Ish vaqti',
      workingHoursLine1: 'Du–Ju: 9:00 – 18:00',
      workingHoursLine2: 'Sha–Ya: kelishuvga binoan',
      company: 'Kompaniya',
      companyName: '"Ustores" MCHJ',
      companyCountry: "O'zbekiston Respublikasi",
      callBtn: "Qo'ng'iroq qilish",
      telegramBtn: 'Telegramda yozish',
      mapTitle: 'Xaritada joylashuv',
      mapAddress: 'Toshkent, Shayxontohur tumani, Jangoh dahasi, 37',
    },
  };

  const t = content[validLang];

  return (
    <main className="min-h-screen bg-slate-950">
      <Header lang={validLang} />
      
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Contact Info Section */}
          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">
              {t.contactInfo}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone */}
              <a
                href="tel:+998903478692"
                className="group p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">{t.phone}</div>
                    <div className="text-lg sm:text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {t.phoneNumber}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{t.phoneHint}</div>
                  </div>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/Ivan_Korotaev"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">{t.telegram}</div>
                    <div className="text-lg sm:text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {t.telegramHandle}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{t.telegramHint}</div>
                  </div>
                </div>
              </a>

              {/* Address */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">{t.address}</div>
                    <div className="text-base sm:text-lg font-semibold text-white">
                      {t.addressLine1}
                    </div>
                    <div className="text-base sm:text-lg text-slate-300">
                      {t.addressLine2}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">{t.workingHours}</div>
                    <div className="text-base sm:text-lg font-semibold text-white">
                      {t.workingHoursLine1}
                    </div>
                    <div className="text-base sm:text-lg text-slate-300">
                      {t.workingHoursLine2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">{t.company}</div>
                <div className="text-base sm:text-lg font-semibold text-white">
                  {t.companyName}
                </div>
                <div className="text-base sm:text-lg text-slate-300">
                  {t.companyCountry}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="tel:+998903478692"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.callBtn}
            </a>
            <a
              href="https://t.me/Ivan_Korotaev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              {t.telegramBtn}
            </a>
          </div>

          {/* Map Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
              {t.mapTitle}
            </h2>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=69.251637%2C41.328928&z=17&l=map&pt=69.251637%2C41.328928%2Cpm2rdl"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
            <p className="text-center text-slate-400 mt-4">
              {t.mapAddress}
            </p>
          </div>
        </div>
      </section>

      <Footer lang={validLang} />
    </main>
  );
}
