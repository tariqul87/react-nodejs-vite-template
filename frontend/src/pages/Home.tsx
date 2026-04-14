import { useAuth } from "../auth/AuthContext";

function HomePage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Protected Route
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Home</h1>
      <p className="mt-4 text-slate-600">
        Signed in as <span className="font-medium">{user?.email}</span>. Your
        access token is used for protected backend routes.
      </p>
    </section>
  );
}

export default HomePage;
