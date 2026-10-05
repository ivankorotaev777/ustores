/** @type {import('next').NextConfig} */
const nextConfig = {
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
