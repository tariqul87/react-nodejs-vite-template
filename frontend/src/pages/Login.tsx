import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch {
      setError("Login failed. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-600">
        Enter your credentials to continue.
      </p>

      <form className="mt-6 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {isLoading ? "Loading..." : isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-slate-700 hover:underline">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-slate-700 hover:underline">
          Create account
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
