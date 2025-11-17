/**
 * CSRF関連のユーティリティ関数
 */

/**
 * CookieからCSRFトークンを取得
 *
 * Spring SecurityがセットしたXSRF-TOKEN Cookieからトークンを取得する
 */
export const getCsrfToken = (): string | null => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

/**
 * CSRF保護されたfetchリクエストを送信
 *
 * 自動的にCSRFトークンをX-XSRF-TOKENヘッダーに追加する
 */
export const fetchWithCsrf = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const csrfToken = getCsrfToken();

  const headers = new Headers(options.headers);

  // CSRFトークンが必要なメソッド（GET, HEAD, OPTIONS以外）
  const method = options.method?.toUpperCase() || 'GET';
  const needsCsrfToken = !['GET', 'HEAD', 'OPTIONS'].includes(method);

  if (needsCsrfToken && csrfToken) {
    headers.set('X-XSRF-TOKEN', csrfToken);
  }

  // credentialsを必ず含める（セッションCookie送信のため）
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  return fetch(url, fetchOptions);
};
