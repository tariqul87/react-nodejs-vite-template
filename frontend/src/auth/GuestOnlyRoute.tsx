import { Navigate } from "react-router-dom";
import { type ReactElement } from "react";
import { useAuth } from "./AuthContext";

/**
 * Routes that signed-out users only should see (e.g. marketing, forgot password).
 * Authenticated users are sent to /home.
 */
export default function GuestOnlyRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-600">Checking your session...</p>
      </section>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
