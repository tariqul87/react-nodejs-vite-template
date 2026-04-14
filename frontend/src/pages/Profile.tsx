import { useEffect, useState } from "react";
import { fetchProfile, type ProfileUser } from "../auth/api";

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const user = await fetchProfile();
        if (!cancelled) setProfile(user);
      } catch {
        if (!cancelled) setError("Could not load your profile. Try signing in again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-600">Loading profile…</p>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-8 text-red-800 shadow-sm">
        <p>{error || "Profile unavailable."}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      <p className="mt-1 text-sm text-slate-600">Your account details from the server.</p>

      <dl className="mt-8 space-y-4 border-t border-slate-100 pt-6">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
          <dd className="mt-1 text-slate-900">{profile.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Display name</dt>
          <dd className="mt-1 text-slate-900">{profile.displayName ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">User ID</dt>
          <dd className="mt-1 break-all font-mono text-sm text-slate-800">{profile.id}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Member since</dt>
          <dd className="mt-1 text-slate-900">{new Date(profile.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Last updated</dt>
          <dd className="mt-1 text-slate-900">{new Date(profile.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ProfilePage;
