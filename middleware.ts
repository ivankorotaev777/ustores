import { NextResponse, type NextRequest } from 'next/server';

// Закрытая презентация для Temu живёт по адресу /temu (статический public/temu/).
// Пускаем только с cookie, которую выдаёт /api/temu-auth после правильного пароля.
// Middleware срабатывает раньше rewrites и раздачи файлов из public/, поэтому
// закрывает и /temu/index.html, и /temu/src/*.
//
// Пароль и токен можно переопределить переменными окружения на Vercel:
//   TEMU_PASSWORD      — что вводит человек (по умолчанию UstoresTemu)
//   TEMU_ACCESS_TOKEN  — что кладём в cookie (смена токена разлогинит всех)

export const TEMU_COOKIE = 'temu_access';
export const TEMU_TOKEN = process.env.TEMU_ACCESS_TOKEN || 'ustores-temu-2026-10';

const NOINDEX = 'noindex, nofollow';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Страница ввода пароля открыта всем, иначе некуда редиректить.
  if (pathname.startsWith('/temu/login')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', NOINDEX);
    return res;
  }

  const cookie = req.cookies.get(TEMU_COOKIE)?.value;
  if (cookie === TEMU_TOKEN) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', NOINDEX);
    return res;
  }

  const login = req.nextUrl.clone();
  login.pathname = '/temu/login';
  login.search = '';
  // Возвращаем человека туда, куда он шёл (сам /temu или его подстраница).
  login.searchParams.set('next', pathname + (search || ''));
  const res = NextResponse.redirect(login);
  res.headers.set('X-Robots-Tag', NOINDEX);
  return res;
}

export const config = {
  matcher: ['/temu', '/temu/:path*'],
};
