import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './cookie-options';

function parseCookieHeader(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce<Record<string, string>>((cookies, cookie) => {
    const [rawName, ...rawValue] = cookie.trim().split('=');
    if (!rawName) return cookies;

    cookies[rawName] = decodeURIComponent(rawValue.join('='));
    return cookies;
  }, {});
}

export function getCookieToken(req: Request, cookieName: string): string | null {
  const cookies = parseCookieHeader(req.headers.cookie);

  return cookies[cookieName] || null;
}

export function getAccessTokenFromCookie(req: Request): string | null {
  return getCookieToken(req, ACCESS_TOKEN_COOKIE);
}

export function getRefreshTokenFromCookie(req: Request): string | null {
  return getCookieToken(req, REFRESH_TOKEN_COOKIE);
}
