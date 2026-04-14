import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Public Route
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Landing Page</h1>
      <p className="mt-4 text-slate-600">
        This page is accessible without authentication.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/login"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Go to Login
        </Link>
        <Link
          to="/signup"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Create Account
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
