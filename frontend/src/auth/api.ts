import axios from "axios";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string | null;
};

export type ProfileUser = AuthUser & {
  createdAt: string;
  updatedAt: string;
};

export type AuthSessionResponse = {
  accessToken: string;
  user: AuthUser;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";

export const authApi = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAccessToken(accessToken: string | null) {
  if (accessToken) {
    authApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return;
  }

  delete authApi.defaults.headers.common.Authorization;
}

export async function signup(payload: { email: string; password: string; displayName?: string }) {
  const response = await authApi.post<AuthSessionResponse>("/api/auth/signup", payload);
  return response.data;
}

export async function login(payload: { email: string; password: string }) {
  const response = await authApi.post<AuthSessionResponse>("/api/auth/login", payload);
  return response.data;
}

export async function refresh() {
  const response = await authApi.post<AuthSessionResponse>("/api/auth/refresh");
  return response.data;
}

export async function logout() {
  await authApi.post("/api/auth/logout");
}

export async function me() {
  const response = await authApi.get<{ user: AuthUser }>("/api/auth/me");
  return response.data.user;
}

export async function fetchProfile() {
  const response = await authApi.get<{ user: ProfileUser }>("/api/auth/profile");
  return response.data.user;
}
