import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const title = import.meta.env.VITE_APP_TITLE ?? "React + Node.js Template";
    document.title = title;
  }, []);

  return (
    <BrowserRouter>
      {/* For practice clarity navbar was moved into a page.
          In a real project, keep shared layout (like navbars) here
          alongside the router so it wraps all routes. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<div className="p-4">Test route</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
