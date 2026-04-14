import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function SignupPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, password);
      navigate("/home");
    } catch {
      setError("Signup failed. Try another email or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Signup</h1>
      <p className="mt-2 text-sm text-slate-600">
        Create an account with your email and password.
      </p>

      <form className="mt-6 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {isLoading ? "Loading..." : isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="text-slate-800 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}

export default SignupPage;
