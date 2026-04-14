import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Signup</h1>
      <p className="mt-2 text-sm text-slate-600">
        Create an account with your email and password.
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
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
            placeholder="Confirm your password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Create Account
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
