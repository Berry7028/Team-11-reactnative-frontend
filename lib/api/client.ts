import type { ApiError } from "./types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL が設定されていません。APIリクエストは失敗します。"
  );
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: ApiError
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  userUuid: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<T> {
  const { method = "GET", body, userUuid } = options;

  if (!API_BASE_URL) {
    throw new ApiRequestError(
      "EXPO_PUBLIC_API_URL が設定されていません。",
      0
    );
  }

  const headers: HeadersInit = {
    "X-User-UUID": userUuid,
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.detail || data.error || "リクエストに失敗しました";
    throw new ApiRequestError(errorMessage, response.status, data);
  }

  return data as T;
}
