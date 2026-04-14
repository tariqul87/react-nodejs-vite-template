import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  login as loginRequest,
  logout as logoutRequest,
  me,
  refresh as refreshRequest,
  setAccessToken,
  signup as signupRequest,
  type AuthUser,
} from "./api";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applySession = useCallback((payload: { accessToken: string; user: AuthUser }) => {
    setAccessToken(payload.accessToken);
    setUser(payload.user);
  }, []);

  const clearAuthState = useCallback(() => {
    setAccessToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginRequest({ email, password });
      applySession(data);
    },
    [applySession],
  );

  const signup = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const data = await signupRequest({ email, password, displayName });
      applySession(data);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore network errors; still clear client state.
    } finally {
      clearAuthState();
    }
  }, [clearAuthState]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const refreshed = await refreshRequest();
        applySession(refreshed);
        const hydratedUser = await me();
        setUser(hydratedUser);
      } catch {
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, [applySession, clearAuthState]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
