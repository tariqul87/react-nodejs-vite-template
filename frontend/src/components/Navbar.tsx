import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded px-2 py-1 transition hover:bg-slate-700 ${isActive ? "bg-slate-700 font-semibold" : ""}`;

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <span className="text-base font-semibold">React + Node.js Template</span>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {!isAuthenticated && (
            <>
              <NavLink to="/" className={linkClass} end>
                Landing
              </NavLink>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Signup
              </NavLink>
              <NavLink to="/forgot-password" className={linkClass}>
                Forgot Password
              </NavLink>
            </>
          )}
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <span
                className="max-w-[140px] truncate rounded bg-slate-700 px-2 py-1 text-xs sm:max-w-none"
                title={user?.email ?? ""}
              >
                {user?.email}
              </span>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="rounded border border-slate-500 bg-slate-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
