import { useState } from "react";
import axios from "axios";

function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessage = async () => {
    setLoading(true);
    setError("");
    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const url = `${apiBase}/api/hello`;

      const response = await axios.get(url);

      setMessage(response.data.message);
    } catch (e: unknown) {
      setError(`Failed to fetch message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <span className="text-base font-semibold">
            React + Node.js Template
          </span>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/test" className="hover:underline">
              Test
            </a>
          </div>
        </div>
      </nav>

      <header className="bg-slate-800 text-white shadow">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <h1 className="text-lg font-semibold">React + Node.js Template</h1>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-slate-800">
            React Frontend
          </h2>
          <p className="text-center text-slate-600">
            Click the button below to fetch a message from the Node.js backend.
          </p>

          <button
            type="button"
            onClick={fetchMessage}
            disabled={loading}
            className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="size-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading…
              </span>
            ) : (
              "Fetch Message"
            )}
          </button>

          {message && (
            <div className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Backend Response:
              </p>
              <p className="mt-1 text-slate-800">{message}</p>
            </div>
          )}

          {error && (
            <div
              className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;

