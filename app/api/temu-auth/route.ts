import { NextResponse, type NextRequest } from 'next/server';

// Вход на закрытую презентацию /temu. Пароль сверяем здесь, на сервере,
// в HTML он не попадает. При успехе ставим cookie на 30 дней.
// Пара к middleware.ts: он проверяет эту cookie на каждом запросе к /temu*.

const COOKIE = 'temu_access';
const TOKEN = process.env.TEMU_ACCESS_TOKEN || 'ustores-temu-2026-10';
const PASSWORD = process.env.TEMU_PASSWORD || 'UstoresTemu';
const MAX_AGE = 60 * 60 * 24 * 30;

function safeNext(raw: FormDataEntryValue | string | null): string {
  const s = typeof raw === 'string' ? raw : '';
  // Только внутренние адреса внутри /temu, чтобы не стать открытым редиректом.
  if (s.startsWith('/temu') && !s.startsWith('//')) return s;
  return '/temu';
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get('password') || '').trim();
  const next = safeNext(form.get('next'));

  if (password !== PASSWORD) {
    const url = new URL('/temu/login', req.url);
    url.searchParams.set('error', '1');
    url.searchParams.set('next', next);
    return NextResponse.redirect(url, 303);
  }

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(COOKIE, TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/temu',
    maxAge: MAX_AGE,
  });
  return res;
}

// GET /api/temu-auth?logout=1 — сбросить cookie (например, после смены пароля).
export async function GET(req: NextRequest) {
  const url = new URL('/temu/login', req.url);
  const res = NextResponse.redirect(url, 303);
  if (req.nextUrl.searchParams.get('logout')) {
    res.cookies.set(COOKIE, '', { path: '/temu', maxAge: 0 });
  }
  return res;
}
