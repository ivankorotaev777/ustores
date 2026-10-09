/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Короткая ссылка для вакансий на OLX: OLX не принимает ссылки на
      // мессенджеры, поэтому ведём на сайт, а сайт сразу отправляет в бот
      // найма Mila. start=olx — чтобы бот записал источник кандидата.
      // Временный редирект (307), чтобы можно было поменять адрес без кэша.
      { source: '/olx', destination: 'https://t.me/Mila2_ustores_bot?start=olx', permanent: false },
      { source: '/olx/', destination: 'https://t.me/Mila2_ustores_bot?start=olx', permanent: false },
    ];
  },
  async rewrites() {
    return {
      // Статические страницы из public/: лендинг Jana Post и карта вакансий.
      // beforeFiles runs ahead of the dynamic app/[lang] route, so /janapost
      // is not interpreted as a language. Sub-assets (/janapost/src, /poster)
      // are served directly from public/ and are unaffected.
      beforeFiles: [
        { source: '/janapost', destination: '/janapost/index.html' },
        { source: '/janapost/', destination: '/janapost/index.html' },
        // Карта вакансий: где сейчас нужны администраторы пунктов выдачи.
        { source: '/rabota', destination: '/rabota/index.html' },
        { source: '/rabota/', destination: '/rabota/index.html' },
        // Закрытая презентация для Temu (пароль проверяет middleware.ts).
        { source: '/temu', destination: '/temu/index.html' },
        { source: '/temu/', destination: '/temu/index.html' },
      ],
    };
  },
};

export default nextConfig;
