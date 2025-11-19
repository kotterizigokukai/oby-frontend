import { fetchWithCsrf } from '@/utils/csrf';

/**
 * APIエラークラス
 */
export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(status: number, statusText: string, data: unknown) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * Orval用カスタムインスタンス
 *
 * すべてのAPI呼び出しでfetchWithCsrfを使用することで、
 * CSRF保護とセッションCookie送信を自動化する
 */
export const customInstance = async <T>(
  config: {
    url: string;
    method: string;
    params?: unknown;
    data?: unknown;
    signal?: AbortSignal;
    headers?: Record<string, string>;
  },
  options?: RequestInit
): Promise<T> => {
  const { url, method, data, signal, headers } = config;

  // FormDataの場合はContent-Typeヘッダーを自動設定させる
  const isFormData = data instanceof FormData;

  // FormDataの場合、Content-Typeは除外するが、他のヘッダーは保持
  const requestHeaders = isFormData
    ? Object.fromEntries(
        Object.entries(headers || {}).filter(([key]) => key.toLowerCase() !== 'content-type')
      )
    : headers;

  const fetchOptions: RequestInit = {
    ...options,
    method,
    signal,
    headers: requestHeaders,
    ...(isFormData ? { body: data as FormData } : data ? { body: JSON.stringify(data) } : {}),
  };

  const response = await fetchWithCsrf(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, response.statusText, errorData);
  }

  // 204 No Contentの場合は空オブジェクトを返す
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

export default customInstance;
