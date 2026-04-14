import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded px-2 py-1 transition hover:bg-slate-700 ${isActive ? "bg-slate-700 font-semibold" : ""}`;

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <span className="text-base font-semibold">React + Node.js Template</span>
        <div className="flex flex-wrap items-center gap-2 text-sm">
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
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
