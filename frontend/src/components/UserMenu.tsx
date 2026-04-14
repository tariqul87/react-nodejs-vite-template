import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        close();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const handleLogout = async () => {
    close();
    await logout();
    navigate("/login", { replace: true });
  };

  const goProfile = () => {
    close();
    navigate("/profile");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded border border-slate-500 bg-slate-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        <span className="max-w-[120px] truncate sm:max-w-[200px]" title={user?.email ?? ""}>
          Account
        </span>
        <svg
          className={`size-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-slate-200 bg-white py-1 text-slate-900 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => void goProfile()}
            className="flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left text-sm transition hover:bg-slate-50"
          >
            <span className="font-medium text-slate-900">Profile</span>
            <span className="truncate text-xs text-slate-500" title={user?.email ?? ""}>
              {user?.email}
            </span>
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button
            type="button"
            role="menuitem"
            onClick={() => void handleLogout()}
            className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
