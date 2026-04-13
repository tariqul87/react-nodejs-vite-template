import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `hover:underline ${isActive ? "font-semibold underline" : ""}`;

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <span className="text-base font-semibold">
          React + Node.js Template
        </span>
        <div className="flex gap-4 text-sm">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/test" className={linkClass}>
            Test
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
