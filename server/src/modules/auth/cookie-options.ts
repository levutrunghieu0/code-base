import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/',
};

export const accessTokenCookieOptions: CookieOptions = {
  ...authCookieOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...authCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
