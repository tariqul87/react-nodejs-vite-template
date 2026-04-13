import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
