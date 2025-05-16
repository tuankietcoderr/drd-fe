import {NextRequest, NextResponse} from 'next/server';
import {ROLE} from './constants/enum';
import {STORAGE_KEY} from './constants/storage-key';
import {jwtDecode} from './utils/decoder';

const fromNextUrlToRole = url => {
  switch (true) {
    case url.startsWith('/nha-tuyen-dung'):
      return ROLE.RECRUITER;
    case url.startsWith('/tai-khoan'):
      return ROLE.USER;
    case url.startsWith('/quan-tri'):
      return ROLE.ADMIN;
    default:
      return null;
  }
};

const fromRoleToNextUrl = role => {
  switch (role) {
    case ROLE.RECRUITER:
      return '/nha-tuyen-dung';
    case ROLE.USER:
      return '/';
    case ROLE.ADMIN:
      return '/quan-tri';
    default:
      return null;
  }
};

/**
 * @param {NextRequest} request
 * @param {NextResponse} response
 */
export const middleware = async (request, response) => {
  const cookies = request.cookies;
  const accessToken = cookies.get(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN)?.value;
  const nextUrl = request.nextUrl.pathname;
  const pathname = request.nextUrl.pathname;
  const currentRole = fromNextUrlToRole(nextUrl);
  const currentRoleUrl = fromRoleToNextUrl(currentRole);

  if (
    pathname.includes('/dang-nhap') ||
    pathname.includes('/dang-ky') ||
    pathname.includes('/quen-mat-khau')
  ) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(
      new URL(
        `${currentRoleUrl}/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  const decodedToken = jwtDecode(accessToken);

  if (!decodedToken) {
    response.cookies.delete(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN);
    response.cookies.delete(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN);

    return NextResponse.redirect(
      new URL(
        `${currentRoleUrl}/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const isTokenExpired = decodedToken.exp < currentTime;
  const authorities = decodedToken.authorities || [];
  const isUser = authorities.length === 0;
  const isAdmin = authorities.includes(ROLE.ADMIN);
  const isRecruiter = authorities.includes(ROLE.RECRUITER);

  console.log({isUser, isAdmin, isRecruiter});

  if (isTokenExpired) {
    response.cookies.delete(STORAGE_KEY.AUTH_TOKEN.ACCESS_TOKEN);
    response.cookies.delete(STORAGE_KEY.AUTH_TOKEN.REFRESH_TOKEN);

    return NextResponse.redirect(
      new URL(
        `${currentRoleUrl}/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  if (!isAdmin && pathname.startsWith('/quan-tri')) {
    return NextResponse.redirect(
      new URL(
        `/quan-tri/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  if (!isRecruiter && pathname.startsWith('/nha-tuyen-dung')) {
    return NextResponse.redirect(
      new URL(
        `/nha-tuyen-dung/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  if (!isUser && pathname.startsWith('/tai-khoan')) {
    return NextResponse.redirect(
      new URL(
        `/dang-nhap?fallbackUrl=${request.nextUrl.pathname}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
};

/**
 * @type {import('next/server').MiddlewareConfig}
 */
export const config = {
  matcher: ['/nha-tuyen-dung/:path*', '/tai-khoan/:path*', '/quan-tri/:path*'],
};
