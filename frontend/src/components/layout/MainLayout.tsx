// File: /frontend/src/components/layout/MainLayout.tsx

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Child routes (our pages) will be rendered here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
