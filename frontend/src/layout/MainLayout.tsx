import TopNavigationBar from "@/components/TopNavigationBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary-50 font-geometria">
      <TopNavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
