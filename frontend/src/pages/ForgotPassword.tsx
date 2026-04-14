import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
      <p className="mt-2 text-sm text-slate-600">
        Enter your email and we will send password reset instructions.
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="reset-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Send Reset Link
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Remembered your password?{" "}
        <Link to="/login" className="text-slate-800 hover:underline">
          Back to login
        </Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;
