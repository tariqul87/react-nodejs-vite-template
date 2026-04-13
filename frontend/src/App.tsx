import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const title = import.meta.env.VITE_APP_TITLE ?? "React + Node.js Template";
    document.title = title;
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/test"
            element={<div className="p-4">Test route</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
